// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import router from './routes/posts.js';

const express = require("express")
const bodyParser =  require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const router = require('./routes/posts.js')

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use('/posts', router);


const CONNECTION_URL = 'mongodb+srv://mernStackMastery:mernStackMastery123@cluster0.yq4ylvu.mongodb.net/'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));