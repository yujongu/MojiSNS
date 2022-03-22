const express = require("express");
const { default: mongoose } = require("mongoose");
const Comment = require("../models/comment");
const router = express.Router();

router.get("/getComments/:id", async (req, res) => {
    const comments = await Comment.find({POST_ID: req.params.id})
    .populate("POST_ID OWNER_ID PARENT_ID LIKED_USERS")
    .sort({createdAt: -1});
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
    console.send("comment removed");
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
module.exports = router;