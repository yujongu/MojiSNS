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

    await user.save();
    console.log(user);

  } catch (error) {
    console.log(error);
  }

});
module.exports = router;