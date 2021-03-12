"use strict";
const express = require("express");
const router = express.Router();
const VideosController = require("../controllers/video");

router.get("/videosList", VideosController.videosList);

module.exports = router;