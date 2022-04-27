const express = require("express");
const { default: mongoose } = require("mongoose");
const Comment = require("../models/comment");
const router = express.Router();
const Post = require("../models/post");

router.get("/getComments/:id", async (req, res) => { //post id
    const comments = await Comment.find({
      POST_ID: req.params.id})//,
      //OWNER_ID:{$nin: req.body.USER.USER_BLOCKLIST})
    .populate("POST_ID OWNER_ID PARENT_ID LIKED_USERS")
    .sort({createdAt: -1, PARENT_ID: 1});
    console.log("Requesting comments list");
    console.log(comments);
    res.send(comments);
});

router.get("/getCommentsByLikes/:id", async (req, res) => {
  const comments = await Comment.find({POST_ID: req.params.id})
  .populate("POST_ID OWNER_ID PARENT_ID LIKED_USERS")
  .sort({LIKES_COUNT: -1});
  console.log("Requesting comments list");
  console.log(comments);
  res.send(comments);
});


router.post("/addComment", async (req, res) => {
  try {
    const comment = new Comment({
      POST_ID: mongoose.Types.ObjectId(req.body.POST_ID),
      OWNER_ID: mongoose.Types.ObjectId(req.body.OWNER_ID),
      CONTENT: req.body.CONTENT,
      PARENT_ID: mongoose.Types.ObjectId(req.body.PARENT_ID)
    });
    await Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.POST_ID)},
      { $inc: {"COMMENTS_COUNT" : 1} }
    )    
    await comment.save();
    res.send(comment);
    console.log(comment);
  } catch (error) {
    console.log(error);
  }
    
});


router.delete("/deleteComment/:id", async (req, res) => {
  try {
    await Comment.updateOne(
      {_id: req.params.id},
      { $set: { CONTENT: "-Comment Deleted-" } },
      );
    res.send("comment removed");
    console.log("comment removed");
  } catch (error) {
    console.log(error);
  }  
});


router.patch("/updateComment/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const comment = await Comment.findById(id);
    if (req.body.CONTENT) {
      comment.CONTENT = req.body.CONTENT;
    }

    await comment.save();
    console.log(comment);

  } catch (error) {
    console.log(error);
  }

});

router.delete("/deleteUser/:id", async (req, res) => { //delete all user comments 
  try {
    await Comment.updateMany(
      {OWNER_ID: req.params.id},
      { $set: { CONTENT: "-Comment Deleted-" } },
      );
    res.send("comments removed");
    console.log("comments removed");
  } catch (error) {
    console.log(error);
  }  
});

router.post("/likeComment/:comment_id/:user_id", async (req, res) => {
  try {
    const temp = await Comment.findOne({ _id: req.params.comment_id })
      .populate("LIKED_USERS");

      if (
        temp.LIKED_USERS.some((e) => e._id.toString() == req.params.user_id)
      ) {
        res.send("already liked");
        console.log("already liked");
        return;
      }
      await Comment.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.comment_id)},
        { $inc: {"LIKES_COUNT" : 1}, $push: {LIKED_USERS: req.params.user_id}}
      )
    
    res.send("comment liked");
    console.log("comment liked");
  } catch (error) {
    console.log(error);
  }
});


router.post("/unlikeComment/:comment_id/:user_id", async (req, res) => {
  try {
    const temp = await Comment.findOne({ _id: req.params.comment_id })
      .populate("LIKED_USERS");

      if (
        !temp.LIKED_USERS.some((e) => e._id.toString() == req.params.user_id)
      ) {
        res.send("comment not liked");
        console.log("comment not liked");
        return;
      }
      await Comment.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.comment_id)},
        { $inc: {"LIKES_COUNT" : -1}, $pull: {LIKED_USERS: req.params.user_id}}
      )
    
    res.send("like removed");
    console.log("like removed");
  } catch (error) {
    console.log(error);
  }
});

router.post("/isLiked/:comment_id/:user_id", async (req, res) => {
  try {
    const temp = await Comment.findOne({ _id: req.params.comment_id })
      .populate("LIKED_USERS");

      if (
        temp.LIKED_USERS.some((e) => e._id.toString() == req.params.user_id)
      ) {
        res.send("Yes");
        console.log("Yes");
        return;
      }
    
    res.send("No");
    console.log("No");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;