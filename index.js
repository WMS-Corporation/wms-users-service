const express = require('express');
const cors= require('cors');
const {connectDB, collections} = require("./src/config/dbConnection");


const app=express();

app.use(express.json());
app.use(cors);

connectDB()
app.listen(3000, () => console.info(`wms-users-service is running `));
module.exports = { app };