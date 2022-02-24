const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//return all posts by newest
router.get("/getPosts", async (req, res) => {
  console.log("find posts");
  const posts = await Post.find()
  .populate("USER_ID TOPIC_ID LIKED_USERS")
  .sort({createdAt: -1});

  console.log(posts);
  res.send(posts);
});


// add post
router.post("/addPost", async (req, res) => {
  try {
    const post = new Post({
      USER_ID: mongoose.Types.ObjectId(req.body.USER_ID),
      TOPIC_ID: mongoose.Types.ObjectId(req.body.TOPIC_ID),
      BODY: req.body.BODY
    });
    await post.save(); //save this object to collection in db
    res.send(post);
    console.log("post added");
  } catch (error) {
    console.log(error);
  }

});


//get single post
router.get("/getPost/:id", async (req, res) => {
  const id =  req.params.id;

  try {
    const post = await Post.findById(id)
    .populate("USER_ID TOPIC_ID LIKED_USERS");

  
    console.log(post);
    await res.send(post); 
  } catch (error) {
    console.log(error);
  }

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
});// delete all comments


//update post
router.patch("/updatePost/:id",  (req, res) => {
  const id = req.params.id;

  Post.updateOne({ _id: id }, {BODY: req.body.BODY})
    .then(result => {
      console.log("post updated");
      res.send(result);
    })
    .catch(err => {console.log(err)});
});


//get all posts from user newest first
router.get("/getPosts/:id", async (req, res) => {
  console.log("find posts by user");
  const id = req.params.id;
  const posts = await Post.find({_id: id})
  .populate("USER_ID TOPIC_ID LIKED_USERS")
  .sort({createdAt: -1});
    
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
          TOPIC_ID: user.FOLLOWING_TOPICS
        },
        {
          USER_ID: user.FOLLOWING_USERS.USER_ID // I hope this line works
        }
      ]
     })
     .populate("USER_ID TOPIC_ID LIKED_USERS")
     .sort({createdAt: -1});

    res.send(post);
    console.log("got feed");
  } catch (error) {
    console.log(error);
  }  
});


//get topic posts
router.get("/getTopicPosts/:id", async (req, res) => {
  try {
    const post = await Post.find({TOPIC_ID: req.params.id})
    .populate("USER_ID TOPIC_ID LIKED_USERS")
    .sort({createdAt: -1});

    res.send(post);
    console.log("got got topic posts");
  } catch (error) {
    console.log(error);
  }  
});


//////////////////////////////////////TEST

router.get("/testAdd", (req, res) => {
  console.log("adding post test")
  const post = new Post({
    USER_ID: mongoose.Types.ObjectId("6217309ae011412017c60aa7"),
    TOPIC_ID: mongoose.Types.ObjectId("621730ffcd274d12d72c22a6"),
    BODY: "Post by testUser1 | Topic: FunnyTest\npost # 2",
    LIKED_USERS: [mongoose.Types.ObjectId("6217309ae011412017c60aa7"), mongoose.Types.ObjectId("621730d77cf288f58cc0edd4")]
  });
  post.save() //save this object to collection in db
    .then( result => {
      res.send(post);
      console.log(result);
    })
    .catch(err => {console.log(err)});
});

///////////////////////////////





















module.exports = router;