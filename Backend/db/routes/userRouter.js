//const { application } = require("express");
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
    const users = await User.find();
    console.log("Requesting user list");
    console.log(users);
    res.send(users);
});

router.post("/addUser", async (req, res) => {
  try {
    const user = await new User({
      USER_EMAIL: req.body.USER_EMAIL,
      USER_PW: req.body.USER_PW,
      USER_SEX: req.body.USER_SEX
    });
    user.save();
    res.send(user);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
    
});

router.get("/getUser/:email", async (req, res) => {
  try {
    const user = await User.findOne({USER_EMAIL: req.params.email});
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

  const user;
  try {
    user = await User.findById(id);
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

module.exports = router;