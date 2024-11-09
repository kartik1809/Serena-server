import express from 'express';
import { UserContent } from '../models/userContent.model.js';
import { UserContentText } from '../models/userContentText.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';




const api_keys=["AIzaSyAznflgaoJlQREOioOSX6-y14HdrLaxVTM", "AIzaSyDrH66TQM6v7KraZuBuXXHG9RMVpQ19yHc","AIzaSyCQLnwApDWDVBkfiCaPeLl34CWXpv6ZYXg","AIzaSyDvQCG2ZWN-nHwkbLMX7Ru2px3VckpUDY8","AIzaSyCmcbJhqCGWLUFCxJ9-c1cRw02YVNlcafw","AIzaSyCiAsAblPkpIUooHwhCNlIk0xsG1pYf69g","AIzaSyC8-GLpk2VHztZ7JMQkwBOFyz-V2I9lIzw","AIzaSyCJcgDsHXBmKp9h08YR6yCK4tj_qaxbcxw","AIzaSyAtYVsTd09dViUUi9KOSmzG5bY77TUVqvQ","AIzaSyCrZUucS9rf4VR_YCIRcLuJHfq9cFMp874","AIzaSyDV--IFfd1jj1aVgxUJ5MdODO43KxkWEuE","AIzaSyABElsHKGmouZv6367DqrYRcnPrUkEwyVE"]

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDrH66TQM6v7KraZuBuXXHG9RMVpQ19yHc";
const genAI = new GoogleGenerativeAI(api_keys[Math.floor(Math.random() * api_keys.length)]);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const categorizeContent = async (domain, content = "is not known , so predict according to domain or url that is given ") => {
    const prompt = `You are an AI content analyzer. I will provide you with the content of a webpage and its domain name. Your task is to evaluate the content and return the following metrics. Please respond **only in JSON format** with the specified keys:

1. **Productivity**: Classify the content into one of the following categories:
   - "Productive"
   - "Slightly Productive"
   - "Slightly Distracting"
   - "Distracting"

2. **Sentiment**: Analyze the emotional tone of the content. Choose one of the following sentiments:
   - "Emotional"
   - "Horror"
   - "Positive"
   - "Negative"
   - "Neutral"
   - "Good"
   - "Peaceful"
   - "Action-packed"
   - "Sad"
   - "Joyful"
   - "Angry"
   - "Excited"
   - "Tense"
   - "Motivated"
   - "Calm"

3. **Category**: Identify the primary category of the content from the following predefined categories:
   - "Work"
   - "Entertainment"
   - "Education"
   - "Social Media"
   - "News"
   - "Health and Fitness"
   - "Personal Development"

4. **Creativity**: Determine whether the content is:
   - "Creative"
   - "Non-Creative"

5. **Mood Factor**: Identify any prominent mood factor reflected in the content. Choose one of the following:
   - "Relaxed"
   - "Excited"
   - "Tense"
   - "Sad"
   - "Joyful"
   - "Motivated"
   - "Calm"
   - "Inspired"
   - "Bored"

### Input:
- Content: ${content}
- Domain: ${domain}

### Output (Example): { "Productivity": "Slightly Productive", "Sentiment": "Good", "Category": "Education", "Creativity": "Creative", "MoodFactor": "Motivated" }
### Note: If you are unsure about any metric, you can respond with "Others and Please respond with the analysis using the specified JSON format only.
`;
    const result = await model.generateContent(prompt);
    return result.response.text() || "Others";
};



export const trackContent = async (req, res) => {
    const { uuid, content } = req.body;

    try {
        let user = await UserContent.findOne({ userId: uuid });
        if (!user) {
            user = new UserContent({ userId: uuid, domains: [] });
        }

        const promises = [];
        const batchSize = 5;

        for (const domainKey in content) {
            const newDomainData = content[domainKey];

            let domain = user.domains.find(d => d.name === newDomainData.name);

            if (!domain) {
                const categoryPromise = categorizeContent(newDomainData.name).then(category => {
                    const domainEntry = {
                        name: newDomainData.name,
                        category,
                        allTime: newDomainData.alltime,
                        days: Object.entries(newDomainData.days).map(([date, dayData]) => ({
                            date,
                            seconds: dayData.seconds
                        })),
                    };
                    user.domains.push(domainEntry);
                });
                promises.push(categoryPromise);
            } else {
                domain.allTime = newDomainData.alltime;

                for (const dayKey in newDomainData.days) {
                    const newDayData = newDomainData.days[dayKey];
                    let existingDay = domain.days.find(d => d.date === dayKey);

                    if (existingDay==new Date().toISOString().slice(0,10) || !existingDay) {
                        domain.days.push({ date: dayKey, seconds: newDayData.seconds });
                    } else {
                        existingDay.seconds = newDayData.seconds;
                    }
                }
            }

            if (promises.length >= batchSize) {
                await Promise.all(promises); 
                promises.length = 0; 
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        
        if (promises.length > 0) {
            await Promise.all(promises);
        }

        
        await user.save();
        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        console.error("Error updating content:", error);
        if (error.response?.status === 429) {
            return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
};



export const trackTextContent = async (req, res) => {
    const { uuid, content } = req.body;

    try {
        let user = await UserContentText.findOne({ uuid });
        if (!user) {
            user = new UserContentText({ uuid, entries: [] });
        }
        content.category = await categorizeContent(content.url, content.content);
        user.entries.push(content);
        await user.save();
        console.log("Content added successfully");
        res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
        console.error("Error updating content:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}