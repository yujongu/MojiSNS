# This is backend readme


API
localhost:5000/api

/post/
      getPosts            -> get all posts by newest
      addPost
      getPost/:post_id         -> get 1 post with corresponding id
      deletePost/:post_id
      updatePost/:post_id
                        
      TODO:
      getPosts/:user_id        -> get all posts from user newest first
      getFeed/:user_id  -> get all post from followed users and topics and sort by new
      getTopicPosts/:topic_id -> get posts only from selected topic

      no. likes, comments? -> keep track automatically
      add array of liked users on schema?




/user/
      getUsers            -> get all users
      addUser
      getUser/:email
      deleteUser/:user_id
      updateUser/:user_id

      TODO:
      getFollowingUsers   -> get following users list
      getFollowerUsers
      getFollowingTopics  -> get following topics list

      add following user/topic in schema?
      add followers in schema
      automatically keep track of these 3 variables when API called 


/topic/
      getTopics
      addTopic
      getTopic/:topic_id

      TODO:
      traffic count

