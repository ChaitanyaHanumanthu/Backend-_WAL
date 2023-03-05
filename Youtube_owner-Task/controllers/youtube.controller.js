// importing express module
const express = require("express");

//importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importng sequelize from database
const sequelize = require("../databases/db.config");

// importing models
const { Owner } = require("../models/owner.model");
const { Channel } = require("../models/channel.model");
const { Video } = require("../models/videos.model");
const { channel } = require("diagnostics_channel");

// assosiations
// one to one
Owner.Channel = Owner.hasOne(Channel, { foreignKey: "ownerid" });
Channel.Owner = Channel.belongsTo(Owner, { foreignKey: { name: "ownerid" } });

// one to many
Channel.Video = Channel.hasMany(Video, { foreignKey: { name: "channelid" } });
Video.Channel = Video.belongsTo(Channel, { foreignKey: "channelid" });

// controlelr for getting owners
const getOwners = expressAsyncHandler(async (req, res) => {
  let owners = await Owner.findAll({
    include: [
      { association: Owner.Channel, include: { association: Channel.Video } },
    ],
  });
  res.send({ message: "Owners data is: ", owners });
});

// inserting data into models

// exporting controllers
const createChannel = expressAsyncHandler(async (req, res) => {
  let creation = await Owner.create(req.body, {
    include: [
      { association: Owner.Channel, include: { association: Channel.Video } },
    ],
  });
  res.send({ message: "created" });
});

// getting channel by owner id
const getOwnerById = expressAsyncHandler(async (req, res) => {
  let owner = await Owner.findOne({
    where: {
      owner_id: req.params.owner_id,
    },
    include: { association: Owner.Channel },
  });
  res.send({ message: "Owner data is", payload: owner });
});

// getting videos based on channel
const getVideos = expressAsyncHandler(async (req, res) => {
  let channel = await Channel.findAll({
    where: { channel_id: req.params.channel_id },
    include: { association: Channel.Video },
  });
  res.send({ message: "Video data is: ", videos: channel });
});

// getting owner by channel no

const getOwnerByChannel = expressAsyncHandler(async (req, res) => {
  let owner = await Channel.findOne({
    where: {
      channel_id: req.params.channel_id,
    },
    include: {
      association: Channel.Owner,
    },
  });
  res.send({ Message: "Owner details", Channel: owner });
});

module.exports = {
  getOwners,
  createChannel,
  getOwnerById,
  getVideos,
  getOwnerByChannel,
};
