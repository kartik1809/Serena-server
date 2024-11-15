import { UserContent } from "../models/userContent.model.js";
import { UserContentText } from "../models/userContentText.model.js";
import { AnalyzeScores} from "../scoring/scoringSystem.js";

export const getAnalytics = async (req, res) => {
    
        const { uuid } = req.body;
        const userDomain = await UserContent.findOne({ userId: uuid });
        const userText = await UserContentText.findOne({ uuid: uuid });
        const result=AnalyzeScores(userDomain,userText);
        res.status(200).json({ message: 'Analytics retrieved successfully', result });
    
}