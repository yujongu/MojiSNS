const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const Topic = require("../models/topic");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//return all posts by newest
router.get("/getPosts", async (req, res) => {
  console.log("find posts");
  const posts = await Post.find()
    .populate("USER_ID TOPIC_ID LIKED_USERS")
    .sort({ createdAt: -1 });

  console.log(posts);
  res.send(posts);
});

// add post
router.post("/addPost", async (req, res) => {
  try {
    const post = new Post({
      USER_ID: mongoose.Types.ObjectId(req.body.USER_ID),
      IS_ANONYMOUS: req.body.IS_ANONYMOUS,
      TOPIC_ID: mongoose.Types.ObjectId(req.body.TOPIC_ID),
      BODY: req.body.BODY,
    });

    const topic = await Topic.findById(req.body.TOPIC_ID);
    topic.TOPIC_TRAFFIC_COUNT = topic.TOPIC_TRAFFIC_COUNT + 1;

    await post.save(); //save this object to collection in db
    await topic.save();
    res.send(post);
    console.log("post added");
  } catch (error) {
    console.log(error);
  }
});

//get single post
router.get("/getPost/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id).populate(
      "USER_ID TOPIC_ID LIKED_USERS"
    );

    console.log(post);
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deletePost/:id", (req, res) => {
  const id = req.params.id;

  Post.findByIdAndDelete(id)
    .then((result) => {
      console.log("post deleted");
      res.send("post deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}); // delete all comments

//update post
router.patch("/updatePost/:id", (req, res) => {
  const id = req.params.id;
  Post.findOneAndUpdate({ _id: id }, { BODY: `${req.body.BODY}\n-Edited-` })
    .then((result) => {
      console.log("post updated");
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all posts from user newest first and exclude anonymous posts.
router.get("/getPosts/:id", async (req, res) => {
  console.log("find posts by user");
  const id = req.params.id;
  const posts = await Post.find({ USER_ID: id, IS_ANONYMOUS: false })
    .populate("USER_ID TOPIC_ID LIKED_USERS")
    .sort({ createdAt: -1 });

  console.log(posts);
  res.send(posts);
});

//get all posts from user newest first.
router.get("/getMyPosts/:id", async (req, res) => {
  console.log("find posts by user");
  const id = req.params.id;
  const posts = await Post.find({ USER_ID: id})
    .populate("USER_ID TOPIC_ID LIKED_USERS")
    .sort({ createdAt: -1 });

  console.log(posts);
  res.send(posts);
});

// get feed
router.get("/getFeed/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const post = await Post.find({
      $or: [
        {
          USER_ID: user.FOLLOWING_USERS.map((o) => o.USER_ID),
        },
        {
          USER_ID: req.params.id,
        },
        { IS_ANONYMOUS: true },
      ],
    })
      .populate("USER_ID TOPIC_ID LIKED_USERS")
      .sort({ createdAt: -1 });

    res.send(post);
    console.log("got feed");
  } catch (error) {
    console.log(error);
  }
});

//get topic posts
router.get("/getTopicPosts/:id", async (req, res) => {
  try {
    const post = await Post.find({ TOPIC_ID: req.params.id })
      .populate("USER_ID TOPIC_ID LIKED_USERS")
      .sort({ createdAt: -1 });

    res.send(post);
    console.log("got topic posts");
  } catch (error) {
    console.log(error);
  }
});

router.post("/likePost/:post_id/:user_id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id })
      .populate("USER_ID TOPIC_ID LIKED_USERS");
      //post.LIKED_USERS.some((e) => console.log(e._id.toString()))


      if (
        post.LIKED_USERS.some((e) => e._id.toString() == req.params.user_id)
      ) {

        res.send("already liked");
        console.log("already liked");
        return;
      }
    await Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.post_id)},
      { $inc: {"LIKES_COUNT" : 1}, $push: {LIKED_USERS: req.params.user_id}}
    )
    
    res.send("post liked");
    console.log("post liked");
  } catch (error) {
    console.log(error);
  }
});

router.post("/unlikePost/:post_id/:user_id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id })
      .populate("USER_ID TOPIC_ID LIKED_USERS");

      if (
        !post.LIKED_USERS.some((e) => e._id.toString() == req.params.user_id)
      ) {
        res.send("post not liked");
        console.log("post not liked");
        return;
      }
      await Post.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.post_id)},
        { $inc: {"LIKES_COUNT" : -1}, $pull: {LIKED_USERS: req.params.user_id}}
      )
    
    res.send("like removed");
    console.log("like removed");
  } catch (error) {
    console.log(error);
  }
});

router.post("/isLiked/:post_id/:user_id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id })
      .populate("USER_ID TOPIC_ID LIKED_USERS");

      if (
        post.LIKED_USERS.some((e) => e._id.toString() == req.params.user_id)
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

router.post("/savePost/:post_id/:user_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id })
      //.populate("USER_ID TOPIC_ID LIKED_USERS");
      //post.LIKED_USERS.some((e) => console.log(e._id.toString()))


      if (
        user.SAVED_POSTS.some((e) => e._id.toString() == req.params.post_id)
      ) {

        res.send("already saved");
        console.log("already saved");
        return;
      }
    await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.user_id)},
      { $push: {SAVED_POSTS: req.params.post_id}}
    )
    
    res.send("post saved");
    console.log("post saved");
  } catch (error) {
    console.log(error);
  }
});

router.post("/unsavePost/:post_id/:user_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id })
      //.populate("USER_ID TOPIC_ID LIKED_USERS");
      //post.LIKED_USERS.some((e) => console.log(e._id.toString()))


      if (
        !user.SAVED_POSTS.some((e) => e._id.toString() == req.params.post_id)
      ) {
        res.send("not saved");
        console.log("not saved");
        return;
      }
    await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.user_id)},
      { $pull: {SAVED_POSTS: req.params.post_id}}
    )
    
    res.send("post unsaved");
    console.log("post unsaved");
  } catch (error) {
    console.log(error);
  }
});

router.get("/getSavedPosts/:user_id", async (req, res) => {
  const user = await User.findOne(
    {_id: req.params.user_id}
  )
  const posts = await Post.find(
    { $all: user.SAVED_POSTS }
  )
    .populate("USER_ID TOPIC_ID LIKED_USERS")

  console.log(posts);
  res.send(posts);
});



router.post("/isSaved/:post_id/:user_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id })
      //.populate("USER_ID TOPIC_ID LIKED_USERS");

      if (
        user.SAVED_POSTS.some((e) => e._id.toString() == req.params.post_id)
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

