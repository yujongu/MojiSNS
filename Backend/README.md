# This is backend readme

To start server:

cd Backend
node server


API

/post/
  http://localhost:5000/api/post/getPosts                 -> get all posts by newest
  http://localhost:5000/api/post/addPost
  http://localhost:5000/api/post/getPost/:post_id         -> get 1 post with corresponding id
  http://localhost:5000/api/post/deletePost/:post_id       
  http://localhost:5000/api/post/updatePost/:post_id
  http://localhost:5000/api/post/getPosts/:user_id        -> get all posts from user newest first
  http://localhost:5000/api/post/getFeed/:user_id         -> get all post from followed users and topics by newest
  http://localhost:5000/api/post/getTopicPosts/:topic_id  -> get posts only from selected topic
    
  TODO:
    delete comments when post deleted
    num likes, comments? just use array.length
    add image file to schema? image_id
    like/dislike post


/user/
  http://localhost:5000/api/user/getUsers            -> get all users
  http://localhost:5000/api/user/signup
  http://localhost:5000/api/user/getUser/:email
  http://localhost:5000/api/user/deleteUser/:user_id
  http://localhost:5000/api/user/updateUser/:user_id
  http://localhost:5000/api/user/followUser/:user_id   -> PUT | adds to user_id.FOLLOWING_USERS
  http://localhost:5000/api/user/followTopic/:user_id   -> PUT
  http://localhost:5000/api/user/unfollowUser/:user_id
  http://localhost:5000/api/user/unfollowTopic/:user_id
  http://localhost:5000/api/user/login/:username/:pw                 -> check if user with id/password exist in db

  TODO:
  likePost

    check validity of follow/unfollow
    separate messages for login
    signup check unique email, unique username


/topic/
  http://localhost:5000/api/topic/getTopics
  http://localhost:5000/api/topic/addTopic
  http://localhost:5000/api/topic/getTopic/:topic_id

  TODO:
    traffic count


/comment/
  http://localhost:5000/api/comment/getComments/:post_id
  http://localhost:5000/api/comment/getCommentsByLikes/:post_id
  http://localhost:5000/api/comment/addComment
  http://localhost:5000/api/comment/deleteComment/:comment_id
  http://localhost:5000/api/comment/updateComment/:comment_id
