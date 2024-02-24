const express = require('express');
const cors= require('cors');
const {connectDB} = require("./src/config/dbConnection");
const router= require('./src/routes/route');
const dotenv = require('dotenv');
/*
* Allow access from any subroute of http://localhost:3000
* */
const userServicePort=process.env.PORT || 4001;
let corsOptions = {
    origin: new RegExp(`http:\/\/localhost:${userServicePort}\/.*`),
};
dotenv.config();

const app=express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.listen(userServicePort, () => console.info(`WMS-users-service is running`));

connectDB();

module.exports = { app };