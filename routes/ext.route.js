import express from "express";
import {trackContent,trackTextContent} from "../controllers/ext.controller.js";

const router=express.Router();

router.post('/trackcontent',trackContent);
router.post('/tracktext',trackTextContent);

export default router;