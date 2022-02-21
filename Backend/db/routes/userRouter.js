//const { application } = require("express");
const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.get("/users", async (req, res) => {
    const users = await User.find()
    console.log("Requesting user list")
    console.log(users)
    res.send(users)
})

router.post("/addUser", async (req, res) => {
    const user = new User({
        USER_EMAIL: req.body.USER_EMAIL,
        USER_PW: req.body.USER_PW,
        USER_SEX: req.body.USER_SEX
    })
})

router.get("/user/:email", async (req, res) => {
    const user = await User.findOne({_id: req.params.email})
    res.send(user)
})

module.exports = router