//const { application } = require("express");
const express = require("express")
const Topic = require("../models/topic")
const router = express.Router()

router.get("/getTopics", async (req, res) => {
    const topic = await Topic.find();
    console.log("Requesting topic list");
    console.log(topic);
    res.send(topic);
})

router.post("/addTopic", async (req, res) => {
    const user = new Topic({
        TOPIC_NAME: req.body.TOPIC_NAME,
        USER_ID: req.body.USER_ID
    })
})

router.get("/getTopic/:id", async (req, res) => {
    const topic = await User.findOne({_id: req.params.id})
    res.send(topic)
})

module.exports = router