import express from 'express';
import {getAnalytics} from '../controllers/analytics.controller.js';

const router=express.Router();

router.post('/getAnalytics',getAnalytics);

export default router;