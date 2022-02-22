//const { application } = require("express");
const express = require("express");
const Post = require("../models/post");
const router = express.Router();

//////////////////////////////////////TEST

router.get("/addPostTest", (req, res) => {
  console.log("adding post test")
  const post = new Post({
    USER_ID: "This is user ID",
    TOPIC_ID: "This is topic ID",
    BODY: "req.body.BODY"
  });
  post.save() //save this object to collection in db
    .then( result => {
      res.send(post);
      console.log(result);
    })
    .catch(err => {console.log(err)});
});

///////////////////////////////











//return all posts by newest
router.get("/getPosts", async (req, res) => {
  console.log("find posts");
  const posts = await Post.find().sort({createdAt: -1});
  console.log(posts);
  res.send(posts);

});


// add post
router.post("/addPost", (req, res) => {
  const post = new Post({
    USER_ID: req.body.USER_ID,
    TOPIC_ID: req.body.TOPIC_ID,
    BODY: req.body.BODY
  });
  post.save() //save this object to collection in db
    .then( result => {
      res.send(post);
      console.log(result);
    })
    .catch(err => {console.log(err)});
});


//get single blog
router.get("/getPost/:id", (req, res) => {
  const id =  req.params.id;

  Post.findById(id)
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(err); });

});

//delete
router.delete("/deletePost/:id", (req, res) => {
  const id =  req.params.id;

  Post.findByIdAndDelete(id)
    .then(result => {
      console.log("post deleted")
      //res.send?
    })
    .catch(err => {console.log(err)});
})// delete all comments


//update post
router.patch("/updatePost/:id",  (req, res) => {
  const id = req.params.id;

  Post.updateOne({ _id: id }, {BODY: req.body.BODY}) //not sure
    .then(result => {
      console.log("post updated");
    })
    .catch(err => {console.log(err)});
})

module.exports = router;