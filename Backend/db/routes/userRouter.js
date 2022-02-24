//const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
    const users = await User.find()
    .populate("FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS");
    console.log("Requesting user list");
    console.log(users);
    res.send(users);
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      USER_EMAIL: req.body.USER_EMAIL,
      USER_PW: req.body.USER_PW,
      USER_USERNAME: req.body.USER_USERNAME
    });
    await user.save();
    res.send(user);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
    
});

router.get("/getUser/:email", async (req, res) => {
  try {
    const user = await User.findOne({USER_EMAIL: req.params.email})
    .populate("FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS");
    res.send(user);
    console.log("got user");
  } catch (error) {
    console.log(error);
  }  
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log("user removed");
  } catch (error) {
    console.log(error);
  }
});

//update user
router.patch("/updateUser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (req.body.USER_EMAIL) { user.USER_EMAIL = req.body.USER_EMAIL; }
    if (req.body.USER_USERNAME) { user.USER_USERNAME = req.body.USER_USERNAME; }
    if (req.body.USER_PW) { user.USER_PW = req.body.USER_PW; }
    if (req.body.USER_BIRTHDAY) { user.USER_BIRTHDAY = req.body.USER_BIRTHDAY; }
    if (req.body.USER_DESCRIPTION) { user.USER_DESCRIPTION = req.body.USER_DESCRIPTION; }
    if (req.body.USER_SEX) { user.USER_SEX = req.body.USER_SEX; }

    await user.save();
    console.log(user);

  } catch (error) {
    console.log(error);
  }

});


router.patch("/followUser/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $push: {FOLLOWING_USERS: {USER_ID: mongoose.Types.ObjectId(req.body.USER_ID), FOLLOW_DATE: Date.now()}}}
    );
    await User.findOneAndUpdate(
      { _id: req.body.USER_ID},
      { $push: {FOLLOWER_USERS: {USER_ID: mongoose.Types.ObjectId(req.params.id), FOLLOW_DATE: Date.now()}}}
    )
    console.log("user followed");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/followTopic/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $push: {FOLLOWING_TOPICS: req.body.TOPIC_ID}}
    );
    console.log("topic followed");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/unfollowUser/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $pull: {FOLLOWING_USERS: {USER_ID: mongoose.Types.ObjectId(req.body.USER_ID)}}}
    );
    await User.findOneAndUpdate(
      { _id: req.body.USER_ID},
      { $pull: {FOLLOWER_USERS: {USER_ID: mongoose.Types.ObjectId(req.params.id)}}}
    )
    console.log("user unfollowed");
  } catch (error) {
    console.log(error);
  }
});


router.patch("/unfollowTopic/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $pull: {FOLLOWING_TOPICS: mongoose.Types.ObjectId(req.body.TOPIC_ID)}}
    );
    console.log("topic unfollowed");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      USER_USERNAME: req.body.USER_USERNAME,
      USER_PW: req.body.USER_PW
    })
    .populate("FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS");
    
    console.send(user)
  } catch (error) {
    console.log(error);
  }
});



/////////TEST///////////////
router.get("/testAdd", async (req, res) => {
  try {
    const user = new User({
      USER_EMAIL: "test@testmail.com",
      USER_PW: "password3",
      USER_USERNAME: "testUser3"
    });
    await user.save();
    res.send(user);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
    
});

router.get("/testFollow/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $push: {FOLLOWING_USERS: {USER_ID: mongoose.Types.ObjectId("621730d77cf288f58cc0edd4"), FOLLOW_DATE: Date.now()}}}
    );
    await User.findOneAndUpdate(
      { _id: "621730d77cf288f58cc0edd4"},
      { $push: {FOLLOWER_USERS: {USER_ID: mongoose.Types.ObjectId(req.params.id), FOLLOW_DATE: Date.now()}}}
    )
    console.log("user followed");
  } catch (error) {
    console.log(error);
  }
});

router.get("/testFollowTopic/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $push: {FOLLOWING_TOPICS: "6217308ae011412017c60aa5"}}
    );
    console.log("topic followed");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;