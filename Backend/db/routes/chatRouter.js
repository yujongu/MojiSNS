//const { application } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");

const axios = require("axios");
const Chat = require("../models/chat");
const router = express.Router();

router.get("/getMessages/:roomname", async (req, res) => {

    const chats = await Chat.find({
        ROOM_NAME: req.params.roomname
    }).sort({createdAt: -1});

    res.send(chats)
})

router.post("/addMessage", async (req, res) => {
    try{
        const chat = new Chat({
            ROOM_NAME: req.body.ROOM_NAME,
            CHAT_OWNER_ID: req.body.CHAT_OWNER_ID,
            CHAT_MESSAGE: req.body.CHAT_MESSAGE,
        });

        await chat.save();
        res.send(chat);
        console.log("chat saved");
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
