"use strict";
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const videoRoutes = require("./routes/video");

mongoose
    .connect('mongodb://localhost:27017/videoTrend', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((error) => {
        console.log(error);
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));



// api routes
app.use("/api", videoRoutes)

module.exports = app;