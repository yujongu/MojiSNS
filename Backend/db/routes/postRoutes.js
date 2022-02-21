//const { application } = require("express");
const express = require("express");
const Post = require("../models/post");
const router = express.Router();

//app.use url encoded

//return all posts by newest
router.get("/main", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1});
    res.send(posts);
  });
  
//create new post
router.post("/main", async (req, res) => { //makes new post on POST request
    const post = new Post(req.body);
    await post.save(); //save this object to collection in db
    res.send(post);//maybe different?
});

//get single blog
router.get("/main/:id", (req, res) => { //async?
    const id =  req.params.id;

    Post.findById(id)
      .then(result => {
        res.render('react file page for post', { blog: result })
        //res.send() //TODO:
      })
      .catch(err => {
        console.log(err);
      });

});

//delete
router.delete("/main/:id", (req, res) => {
  const id =  req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs'}) //redirect on frontend
    })
    .catch(err => {console.log(err)});
})// delete all comments


//update post
router.patch("/main/:id",  (req, res) => {
  const id = req.params.id;

  //const post = await Post.findById(id)
  
  await Post.updateOne({ _id: id }, {BODY: req.body}) //not sure
})
module.exports = router;