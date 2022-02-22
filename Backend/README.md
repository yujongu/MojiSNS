# This is backend readme


API
localhost:5000/api
ex) localhost:5000/api/post/getPosts


/post/
      getPosts            -> get all posts by newest
      addPost
      getPost/:post_id         -> get 1 post with corresponding id
      deletePost/:post_id
      updatePost/:post_id
      getPosts/:user_id        -> get all posts from user newest first
                        
      TODO:
      getFeed/:user_id  -> get all post from followed users and topics and sort by new
      getTopicPosts/:topic_id -> get posts only from selected topic

      num likes, comments? -> keep track automatically with API call
      add image file to schema? image_id




/user/
      getUsers            -> get all users
      addUser
      getUser/:email
      deleteUser/:user_id
      updateUser/:user_id

      TODO:
      getFollowingUsers   -> get following users list
      getFollowerUsers    -> get follower users list
      getFollowingTopics  -> get following topics list
      
      addFollowingUser
      addFollowerUser
      addFollowingTopic  ->

      deleteFollowingUser
      deleteFollowerUser
      deleteFollowingTopic

      automatically keep track of  3 array variables when API called for both sides
      add number for following/followers in schema?


/topic/
      getTopics
      addTopic
      getTopic/:topic_id

      TODO:
      traffic count

/comment/
TODO: