const express = require('express');
const cors= require('cors');
const {connectDB, collections} = require("./src/config/dbConnection");
const router= require('./src/routes/route');


const app=express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use(router);

connectDB();

module.exports = { app };