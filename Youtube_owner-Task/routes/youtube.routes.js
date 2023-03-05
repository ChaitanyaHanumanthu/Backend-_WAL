// importing app
const express = require("express");

// router defining
const youtubeApp = express.Router();

// body parser
youtubeApp.use(express.json());

// imporoting routes

const {
  getOwners,
  createChannel,
  getOwnerById,
  getVideos,
  getOwnerByChannel,
} = require("../controllers/youtube.controller");
// routes
youtubeApp.get("/get-owner", getOwners);

youtubeApp.post("/create-data", createChannel);

youtubeApp.get("/get-owner/:owner_id", getOwnerById);

youtubeApp.get("/get-videos/:channel_id", getVideos);

youtubeApp.get("/get-owner-channel/:channel_id", getOwnerByChannel);
//exporting router
module.exports = youtubeApp;
