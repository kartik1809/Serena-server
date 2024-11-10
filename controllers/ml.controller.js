import { UserContent } from "../models/userContent.model.js";
import { UserContentText } from "../models/userContentText.model.js";
import natural from "natural";
import category_keywords from "./key.controller.js";
import { generateContentScores } from "./categorize.controller.js";
import UserAnalytics from "../models/userAnalytics.model.js";

const categories = [
  "Work",
  "Entertainment",
  "Education",
  "Social",
  "Media",
  "News",
  "Health",
  "Fitness",
  "Personal",
  "Development",
  "Technology",
  "Arts",
  "Culture",
  "Others"
]

const categorizeDomain = (content, categories) => {

  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(content.category);
  const category = tokens.find((token) => categories.includes(token));
  if (category === "Social" || category === "Media") return "Social Media";
  return category || "Others";
}


const reduceTotalTime = (domains) => {
  let totalTime = 0;
  domains.forEach((domain) => {
    domain.days.forEach((day) => {
      totalTime += day.seconds;
    });
  });
  return totalTime;
};

const reduceCategoryTime = (domains) => {
  let categoryTime = {
    labels: [],
    data: [],
  };
  domains.forEach((domain) => {

    const name = categorizeDomain(domain, categories);
    if (!categoryTime.labels.includes(name)) {
      categoryTime.labels.push(name);
      categoryTime.data.push(0);
    }
    let totalTime = 0;
    domain.days.forEach((day) => {
      totalTime += day.seconds;
    });
    if (categoryTime.labels.includes(name)) categoryTime.data[categoryTime.labels.indexOf(name)] += totalTime;
    else categoryTime.data.push(totalTime);
  });
  return categoryTime;
}

const trimName = (name) => {

  return name;
}

const checkDomainUsageTime = (domains) => {
  let websiteUsage = {
    labels: [],
    data: [],
  };
  domains.forEach((domain) => {
    const name = trimName(domain.name);
    websiteUsage.labels.push(name);
    let totalTime = 0;
    domain.days.forEach((day) => {
      totalTime += day.seconds;
    });
    websiteUsage.data.push(totalTime);
  });
  return websiteUsage;
}

let totalTime = 0;
let categoryTime = {};
let websiteUsage = {};

//Time Analysis : Total time spent on each category
const analyseUserTime = async (userId, days) => {
  let userContent = await UserContent.findOne({ userId });
  if (!userContent) throw new Error("User not found!");
  userContent = userContent.toJSON();
  const recentDomains = userContent.domains.map((domain) => ({
    ...domain,
    days: domain.days.filter(
      (day) =>
        new Date(day.date) >= new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    ),
  }));
  totalTime = reduceTotalTime(recentDomains);
  categoryTime = reduceCategoryTime(recentDomains);
  websiteUsage = checkDomainUsageTime(recentDomains);
  return { totalTime, categoryTime, websiteUsage };
}

//Content Analysis : Scores for productivity, creativity, mental health and analysis of text data
const analyseUserContent = async (uuid, days) => {
  const userContent = await UserContentText.findOne({ uuid });
  if (!userContent) throw new Error("User not found!");
  const recentEntries = userContent.entries.filter(
    (entry) => new Date(entry.date) >= new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  );
  const res = generateContentScores(recentEntries, categoryTime, categories, category_keywords, totalTime);
  return res;

}

//Producitivity Trend Analysis
const processTimeTrack = (categoryTime) => {
  let productivityTrend = {
    labels: [],
    data: [],
  };

  const currentDate = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - i);
    const dayIndex = pastDate.getDay();
    productivityTrend.labels.push(daysOfWeek[dayIndex]);

    if (categoryTime.data[6 - i]) {
      productivityTrend.data.push((categoryTime.data[6 - i] / 6) % 10);
    } else {
      productivityTrend.data.push(0);
    }
  }

  return productivityTrend;
};



const generateFinalMetrics = async (userId, uuid, days) => {
  const userTimeAnalytics = await analyseUserTime(userId, days);
  const userContentAnalytics = await analyseUserContent(uuid, days);
  const productivityTrend = processTimeTrack(userTimeAnalytics.categoryTime);
  const result = {
    totalTime: userTimeAnalytics.totalTime,
    contentConsumption: userTimeAnalytics.categoryTime,
    websiteUsage: userTimeAnalytics.websiteUsage,
    creativity: userContentAnalytics.creativity,
    mentalHealth: userContentAnalytics.mentalHealth,
    productivity: userContentAnalytics.productivity,
    productivityTrend: productivityTrend
  }
  return result;
}


// API Endpoint to Generate Metrics
export const generateMetrics = async (req, res) => {
  const { uuid, days = 7 } = req.body; // Default value added here
  try {
    const checkDB = await UserAnalytics.findOne({ uuid });
    if (checkDB) {
      const userContent = checkDB.toJSON();
      if (new Date(userContent.dateAdded).getTime() > Date.now() - 30 * 60 * 1000) {
        res.json(userContent);
        return;
      }
      else {
        await UserAnalytics.deleteOne({ uuid });
      }
    }
    
    const metrics = await generateFinalMetrics(uuid, uuid, days);
    const result = new UserAnalytics({ uuid, ...metrics, dateAdded: Date.now() });
    await result.save();
    res.json(result);
  } catch (error) {
    console.error("Error generating metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


