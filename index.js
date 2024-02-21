const express = require('express');
const cors= require('cors');
const {connectDB} = require("./src/config/dbConnection");
const router= require('./src/routes/route');
const dotenv = require('dotenv');
/*
* Allow access from any subroute of http://localhost:3000
* */
let corsOptions = {
    origin: /http:\/\/localhost:3000\/.*/
};
dotenv.config();

const port = process.env.PORT;

const app=express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.listen(port, () => console.info(`WMS-users-service is running`));

connectDB();

module.exports = { app };