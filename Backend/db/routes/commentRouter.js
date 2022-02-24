const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

router.get("/getComments/:id", async (req, res) => {
    const comments = await Comment.find({POST_ID: req.params.id}).sort({createdAt: -1});
    console.log("Requesting comments list");
    console.log(comments);
    res.send(comments);
});

router.get("/getCommentsByLikes/:id", async (req, res) => {
  const comments = await Comment.find({POST_ID: req.params.id}).sort({LIKES_COUNT: -1});
  console.log("Requesting comments list");
  console.log(comments);
  res.send(comments);
});

router.post("/addComment", async (req, res) => {
  try {
    const comment = new Comment({
      POST_ID: req.body.POST_ID,
      OWNER_ID: req.body.OWNER_ID,
      CONTENT: req.body.CONTENT,
      PARENT_ID: req.body.PARENT_ID
    });
    await comment.save();
    res.send(comment);
    console.log(comment);
  } catch (error) {
    console.log(error);
  }
    
});


router.delete("/deleteComment/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    console.log("comment removed");
  } catch (error) {
    console.log(error);
  }  
});

//update user
router.patch("/updateComment/:id", async (req, res) => {
  const id = req.params.id;

  const comment;
  try {
    comment = await Comment.findById(id);
    if (req.body.CONTENT) {
      comment.CONTENT = req.body.CONTENT;
    }

    await comment.save();
    console.log(comment);

  } catch (error) {
    console.log(error);
  }

});


router.patch("/followUser/:id", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id},
      { $push: {FOLLOWING_USERS: {USER_ID: req.body.USER_ID, FOLLOW_DATE: Date.now()}}}
    );
    await User.findOneAndUpdate(
      { _id: req.body.USER_ID},
      { $push: {FOLLOWER_USERS: {USER_ID: req.params.id, FOLLOW_DATE: Date.now()}}}
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
      { $push: {TOPIC_ID: req.body.TOPIC_ID}}
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
      { $pull: {FOLLOWING_USERS: {USER_ID: req.body.USER_ID}}}
    );
    await User.findOneAndUpdate(
      { _id: req.body.USER_ID},
      { $pull: {FOLLOWER_USERS: {USER_ID: req.params.id}}}
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
      { $pull: {TOPIC_ID: req.body.TOPIC_ID}}
    );
    console.log("topic followed");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;