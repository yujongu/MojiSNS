//const { application } = require("express");
const express = require("express");
const Post = require("../models/post");
const router = express.Router();

//return all posts by newest
router.get("/getPosts", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1});
    console.log(posts);
    res.send(posts);
  });
  
//create new post
router.post("/addPost", (req, res) => { //makes new post on POST request
    const post = new Post({
      USER_ID: req.body.USER_ID,
      TOPIC_ID: req.body.TOPIC_ID,
      BODY: req.body.BODY
    });
    await post.save(); //save this object to collection in db
    res.send(post);//maybe different?
});

//get single blog
router.get("/getPost/:id", (req, res) => { //async?
    const id =  req.params.id;

    Post.findById(id)
      .then(result => {
        console.log("got post")
        res.send(result);
      })
      .catch(err => { console.log(err); });

});

//delete
router.delete("/deletePost/:id", (req, res) => {
  const id =  req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      console.log("post deleted") //redirect on frontend
    })
    .catch(err => {console.log(err)});
})// delete all comments


//update post
router.patch("/updatePost/:id",  (req, res) => {
  const id = req.params.id;

  //const post = await Post.findById(id)
  Post.updateOne({ _id: id }, {BODY: req.body.BODY}) //not sure
    .then(result => {
      console.log("post updated");
    })
    .catch(err => {console.log(err)});
})

module.exports = router;