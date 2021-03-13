"use strict";
const express = require("express");
const router = express.Router();
const VideosController = require("../controllers/video");

router.get("/videosList", VideosController.videosList);
router.get("/videoDetails/:videoId", VideosController.videoDetails);
router.put("/videosListUpdate", VideosController.videosListUpdate);

module.exports = router;