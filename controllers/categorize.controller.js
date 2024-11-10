import natural from "natural";
import Sentiment from "sentiment";
import {score_weights,formatScore} from "./score_weights.controller.js";

const sentiment = new Sentiment();

const getSentimentScore = (text) => {
    const result = sentiment.analyze(text);
    return result.score;
};

const normalizeSentimentScore = (score) => {
    return Math.max(0, Math.min(10, score / 10));
};

const clampScore = (score) => {
    return Math.max(0, Math.min(10, score));
};

const updateScores = (overallScores, category, subKey, sentimentScore, scoreWeight) => {
    overallScores[category][subKey] += clampScore(
        (scoreWeight || 5) * 0.7 + sentimentScore * 0.3
    );
};

const categorizeContent = (content,categories) => {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(content);
    const category = tokens.find((token) => categories.includes(token));
    if(category==="Social" || category==="Media") return "Social Media";
    return category || "Others";
}

export const generateContentScores = (
    entries,
    categoryTime,
    categories,
    category_keywords,
    totalTime
) => {
    let overallScores = {
        creativity: {
            ideaGeneration: 0,
            problemSolving: 0,
            innovation: 0,
            artisticExpression: 0,
            criticalThinking: 0,
            curiosity: 0,
        },
        mentalHealth: {
            stress: 0,
            anxiety: 0,
            mood: 0,
            sleep: 0,
            mindfulness: 0,
            socialConnections: 0,
        },
        productivity: {
            focusTime: 0,
            taskCompletion: 0,
            efficiency: 0,
            timeManagement: 0,
            goalAchievement: 0,
            workLifeBalance: 0,
        },
    };

    let entryCount = entries.length;

    entries.forEach((entry) => {
        const category = categorizeContent(entry.category, categories);
        const sentimentScore = normalizeSentimentScore(getSentimentScore(entry.content));


        const creativityKeys = Object.keys(overallScores.creativity);
        const mentalHealthKeys = Object.keys(overallScores.mentalHealth);
        const productivityKeys = Object.keys(overallScores.productivity);


        creativityKeys.forEach((key) => {
            updateScores(overallScores, "creativity", key, sentimentScore, score_weights[category]?.creativity?.[key]);
        });

        mentalHealthKeys.forEach((key) => {
            updateScores(overallScores, "mentalHealth", key, sentimentScore, score_weights[category]?.mentalHealth?.[key]);
        });

        productivityKeys.forEach((key) => {
            updateScores(overallScores, "productivity", key, sentimentScore, score_weights[category]?.productivity?.[key]);
        });
    });

    // const timeWeight = 0.5;
    // let timePercent=[];
    // for(let i=0;i<categoryTime.length;i++){
    //     timePercent.push(categoryTime[i]/totalTime*10);
    // }
    // * timePercent[key] * timeWeight

    for (let key in overallScores) {
        for (let subKey in overallScores[key]) {
            overallScores[key][subKey] = formatScore(clampScore(overallScores[key][subKey] / entryCount ));
        }
    }

    return overallScores;
};
