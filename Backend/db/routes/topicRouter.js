const express = require("express");
const Topic = require("../models/topic");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/getTopics", async (req, res) => {
  const topics = await Topic.find();
  console.log("Requesting topic list");
  res.send(topics);
});

router.post("/addTopic", async (req, res) => {
  try {
    const topic = new Topic({
      TOPIC_NAME: req.body.TOPIC_NAME,
    });
    await topic.save();
    res.send(topic);
    console.log("topic added");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/addOneTrafficCount", async (req, res) => {
  try {
    const topic = await Topic.findById(req.body.TOPIC_ID);
    topic.TOPIC_TRAFFIC_COUNT = topic.TOPIC_TRAFFIC_COUNT + 1;
  } catch (error) {
    console.log(error)

  }
})

router.get("/getTopic/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    res.send(topic);
    console.log(topic);
  } catch (error) {
    console.log(error);
  }
});

////////TEST////////////////////////////
router.get("/testAdd", async (req, res) => {
  try {
    const topic = new Topic({
      TOPIC_NAME: "FunnyTest",
      USER_ID: "placeholder",
    });
    await topic.save();
    res.send(topic);
    console.log("topic added");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
