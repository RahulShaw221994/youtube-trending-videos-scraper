"use strict";
const axios = require('axios');
const cheerio = require('cheerio');
const youtubeTrendUrl = 'https://www.youtube.com/feed/trending';
const youtubeViewUrl = 'https://www.youtube.com/watch?v=Bo1EZxbzPIo&t=4s';
const fs = require('fs');
const Video = require("../models/video");

exports.videosList = async (req, res, next) => {
    try {
        const {
            data
        } = await axios.get(youtubeTrendUrl)

        const $ = cheerio.load(data, {
            xmlMode: false
        });
        const trendData = $('script')[33].children[0].data;
        const trendDataClean = trendData.match(/var ytInitialData = (\{[\s\S]*?\});/);
        const trendDataFiltered = JSON.parse(trendDataClean[1]);
        const trendDataList = trendDataFiltered.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.
        content.sectionListRenderer.contents;
        const videoDetails = [];

        for (let i = 0; i < trendDataList.length; i++) {
            if (i === 1) {
                continue;
            }
            for (let j = 0; j < trendDataList[i].itemSectionRenderer.contents.length; j++) {
                for (let k = 0; k < trendDataList[i].itemSectionRenderer.contents[j].shelfRenderer.content.expandedShelfContentsRenderer.items.length; k++) {
                    const videoDetailsPath = trendDataList[i].itemSectionRenderer.contents[j].shelfRenderer.content.
                    expandedShelfContentsRenderer.items[k].videoRenderer;
                    let videoDetailsObj = new VideoDetailsObj(videoDetailsPath.videoId, videoDetailsPath.title.runs[0].text,
                        videoDetailsPath.descriptionSnippet.runs[0].text,
                        `${youtubeViewUrl}${videoDetailsPath.navigationEndpoint.commandMetadata.webCommandMetadata.
                        url}`, videoDetailsPath.thumbnail.thumbnails[0].url, videoDetailsPath.viewCountText.simpleText,
                        "sdsds", "dsdsds", videoDetailsPath.ownerText.runs[0].text, "dsdsd", videoDetailsPath.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer
                        .thumbnail.thumbnails[0].url, "dsdsds");
                    videoDetails.push(videoDetailsObj);
                }
            }

        }

        // save db
        Video.insertMany(videoDetails).then(function () {
            console.log("Data inserted") // Success 
        }).catch(function (error) {
            console.log(error) // Failure 
        });

        res.status(200).json(videoDetails);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
};

// video data prototype
function VideoDetailsObj(videoId, videoTitle, videoDescription, videoUrl, videoThumbnail, videoViewCount,
    videoLikes, videoDislike, channelTitle, channelDescription, channelThumbnail, channelSubscribers) {
    this.videoId = videoId;
    this.videoTitle = videoTitle;
    this.videoDescription = videoDescription;
    this.videoUrl = videoUrl;
    this.videoThumbnail = videoThumbnail;
    this.videoViewCount = videoViewCount;
    this.videoLikes = videoLikes;
    this.videoDislike = videoDislike;
    this.channelTitle = channelTitle;
    this.channelDescription = channelDescription;
    this.channelTumbnail = channelThumbnail;
    this.channelSubscribers = channelSubscribers;
}