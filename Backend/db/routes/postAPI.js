const { application } = require("express");
const express = require("express");
const Post = require("./models/post");
const router = express.Router();

router.get("/main", async (req, res) => { //maybe not url?
    const posts = await Post.find().sort({ createdAt: -1});
    res.send(posts);
  }); //this returns everything
  

router.post("/main", async (req, res) => { //makes new post on POST request
    const post = new Post(req.body);
    await post.save(); //save this object to collection in db
    res.send(post);//maybe different?
});

// router.get("/single-blog", async (req, res))

//get single blog
router.get("/main/:id", async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  });