//const { application } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Token = require("../models/token");
const sendEmail = require("../email/sendEmail");

const router = express.Router();
const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");
//const bcrypt = require("bcrypt");

router.get("/getUsers", async (req, res) => {
  const users = await User.find().populate(
    "FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS"
  );
  console.log("Requesting user list");
  console.log(users);
  res.send(users);
});

router.post("/signup", async (req, res) => {
  let temp = (await User.find({ USER_EMAIL: req.body.USER_EMAIL }).count()) > 0;

  if (temp) {
    res.status(400).send("email exists");
    console.log("email exists");
    return;
  }

  temp =
    (await User.find({ USER_USERNAME: req.body.USER_USERNAME }).count()) > 0;
  if (temp) {
    res.status(400).send("username exists");
    console.log("username exists");
    return;
  }

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(req.body.USER_PW, salt, 64).toString("hex");
  try {
    const user = new User({
      USER_EMAIL: req.body.USER_EMAIL,
      USER_PW: `${salt}:${hashedPassword}`,
      USER_USERNAME: req.body.USER_USERNAME,
    });
    await user.save();
    res.send(user);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getUserByEmail/:email", async (req, res) => {
  try {
    const user = await User.findOne({ USER_EMAIL: req.params.email }).populate(
      "FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS"
    );
    res.send(user);
    console.log("got user");
  } catch (error) {
    console.log(error);
  }
});

router.get("/getUserByUsername/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      USER_USERNAME: req.params.username,
    }).populate(
      "FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS"
    );
    res.send(user);
    console.log("got user");
  } catch (error) {
    console.log(error);
  }
});

router.get("/findUserByUsername/:username", async (req, res) => {
  try {
    const user = await User.find({
      USER_USERNAME: { $regex: `${req.params.username}`, $options: "i" },
    }).populate(
      "FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS"
    );
    res.send(user);
    console.log(user);
    console.log("got user");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({USER_ID: req.params.id})
    
    console.log("delete user");
    res.send("delete user");
  } catch (error) {
    console.log(error);
  }
});

//update user
router.patch("/updateUser/:id", async (req, res) => {
  try {
    console.log("wassup");
    console.log(req.body.USER_EMAIL);
    const user = await User.findById(req.params.id).populate(
      "FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS"
    );

    if (req.body.USER_EMAIL) {
      user.USER_EMAIL = req.body.USER_EMAIL;
    }
    if (req.body.USER_USERNAME) {
      user.USER_USERNAME = req.body.USER_USERNAME;
    }
    /*if (req.body.USER_PW) {
      const salt = randomBytes(16).toString('hex');
      const hashedPassword = scryptSync(req.body.USER_PW, salt, 64).toString('hex');
      user.USER_PW = `${salt}:${hashedPassword}`;
    }*/
    if (req.body.USER_BIRTHDAY) {
      user.USER_BIRTHDAY = req.body.USER_BIRTHDAY;
    }
    if (req.body.USER_DESCRIPTION) {
      user.USER_DESCRIPTION = req.body.USER_DESCRIPTION;
    }
    if (req.body.USER_SEX) {
      console.log(req.body);
    }
    if (req.body.FOLLOWING_TOPICS) {
      user.FOLLOWING_TOPICS = req.body.FOLLOWING_TOPICS;
    }

    await user.save();
    console.log("Passed!!");
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getMyFollowings/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      //.select("FOLLOWING_USERS")
      .populate("FOLLOWING_USERS.USER_ID")
      .sort({"FOLLOWING_USERS.FOLLOW_DATE": 1});

    res.send(user);
    console.log(user);
    console.log("got user");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/followUser/:id", async (req, res) => {
  try {
    let temp = await User.findOne({ _id: req.params.id });

    if (
      temp.FOLLOWING_USERS.some((e) => e.USER_ID.toString() == req.body.USER_ID)
    ) {
      res.send("already following");
      console.log("already following");
      return;
    }

    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          FOLLOWING_USERS: {
            USER_ID: mongoose.Types.ObjectId(req.body.USER_ID),
            FOLLOW_DATE: Date.now(),
          },
        },
      }
    );
    await User.findOneAndUpdate(
      { _id: req.body.USER_ID },
      {
        $push: {
          FOLLOWER_USERS: {
            USER_ID: mongoose.Types.ObjectId(req.params.id),
            FOLLOW_DATE: Date.now(),
          },
        },
      }
    );
    console.log("user followed");
    res.send("user followed");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/followTopic/:id", async (req, res) => {
  try {
    let temp = await User.findOne({ _id: req.params.id });

    if (temp.FOLLOWING_TOPICS.some((e) => e.toString() == req.body.TOPIC_ID)) {
      res.send("already following");
      console.log("already following");
      return;
    }
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { FOLLOWING_TOPICS: req.body.TOPIC_ID } }
    );
    console.log("topic followed");
    res.send("topic followed");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/unfollowUser/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          FOLLOWING_USERS: {
            USER_ID: mongoose.Types.ObjectId(req.body.USER_ID),
          },
        },
      }
    );
    await User.findOneAndUpdate(
      { _id: req.body.USER_ID },
      {
        $pull: {
          FOLLOWER_USERS: { USER_ID: mongoose.Types.ObjectId(req.params.id) },
        },
      }
    );
    console.log("user unfollowed");
    res.send("user unfollowed");
  } catch (error) {
    console.log(error);
  }
});

router.patch("/unfollowTopic/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { FOLLOWING_TOPICS: mongoose.Types.ObjectId(req.body.TOPIC_ID) },
      }
    );
    console.log("topic unfollowed");
    res.send("topic unfollowed");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login/:username/:password", async (req, res) => {
  try {
    const user = await User.findOne({
      USER_USERNAME: req.params.username,
    }).populate(
      "FOLLOWING_USERS.USER_ID FOLLOWER_USERS.USER_ID FOLLOWING_TOPICS"
    );

    if (!user) {
      res.send("User not found");
      console.log("user not found");
      return;
    }
    const [salt, key] = user.USER_PW.split(":");
    const hashedBuffer = scryptSync(req.params.password, salt, 64);

    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
      res.send(user);
      console.log(user);
      return;
    } else {
      res.send("Incorrect password");
      console.log("Incorrect password");
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/auth/requestResetPassword/:email", async (req, res) => {
  console.log("request reset pw");
  const user = await User.findOne({ USER_EMAIL: req.params.email });
  if (!user) return res.send("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = randomBytes(32).toString("hex");

  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(resetToken, salt, 64).toString("hex");

  await new Token({
    userId: user._id,
    token: `${salt}:${hash}`,
    createdAt: Date.now(),
  }).save();

  const link = `localhost:3000/passwordReset/${user._id}/${resetToken}`;
  sendEmail(user.USER_EMAIL,"Password Reset Request",{name: user.USER_USERNAME,link: link,},"./template/requestResetPassword.handlebars");
  return link;

});

router.post("/auth/resetPassword", async (req, res) => {
  let passwordResetToken = await Token.findOne({ userId: req.body.userid });
  console.log("hello");
  console.log(req.body);
  if (!passwordResetToken) {
    console.log("Invalid or expired password reset token1234")
    return res.send("Invalid or expired password reset token");
  }



  
  const [salt, key] = passwordResetToken.token.split(":");
  const hashedBuffer = scryptSync(req.body.token, salt, 64);

  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  //const isValid = await bcrypt.compare(token, passwordResetToken.token);

  //console.log(hashedBuffer)
  console.log(keyBuffer)
  

  console.log(match)
  if (!match) {
    console.log("Invalid or expired password reset token")
    return res.send("Invalid or expired password reset token");
  }

  const salt2 = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(req.body.password, salt2, 64).toString(
    "hex"
  );


  const user = await User.findById(req.body.userid);
  user.USER_PW = `${salt2}:${hashedPassword}`;
  
  await user.save();

  sendEmail(
    user.USER_EMAIL,
    "Password Reset Successfully",
    {
      name: user.USER_USERNAME,
    },
    "./template/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  res.send("Password reset");
});


router.post("/addProfilePicture/:id", async (req, res) => {
  console.log("body =")
  console.log(req.body);

  try {
    await User.updateOne(
      { _id: req.params.id },
      { $set: { PROFILE_PICTURE: req.body.FILE } },
      { new: true }
    );
    console.log(req.body.FILE);
    res.send("file uploaded");
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
