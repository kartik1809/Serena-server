import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import AuthRoute from './routes/auth.route.js';
import ExtensionRoute from './routes/ext.route.js';
import AnalyticsRoute from './routes/analytics.route.js';

const app=express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

const CONNECTION_URL=process.env.MONGO_URI;
mongoose.connect(CONNECTION_URL)
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Serena Backend Activated :)");
});

app.use('/auth',AuthRoute);
app.use('/ext',ExtensionRoute);
app.use('/analytics',AnalyticsRoute);

console.log("Server Activated");
console.log(new Date().toISOString().slice(0,10))




