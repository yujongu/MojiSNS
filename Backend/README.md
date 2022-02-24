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

      getFeed/:user_id  -> get all post from followed users and topics and sort by new
      getTopicPosts/:topic_id -> get posts only from selected topic
               
      TODO:
      delete comments when post deleted
      num likes, comments? just use array.length
      add image file to schema? image_id




/user/
      getUsers            -> get all users
      signup
      getUser/:email
      deleteUser/:user_id
      updateUser/:user_id

      followUser/:user_id   is a .patch | adds to user_id.FOLLOWING_USERS | does not check for validity yet!
      followTopic/:user_id
      unfollowUser/:user_id
      unfollowTopic/:user_id
      login                 -> check if id/password exist in db

      TODO:
      check validity of follow/unfollow
      separate messages for login
      signup check unique email, unique username


/topic/
      getTopics
      addTopic
      getTopic/:topic_id

      TODO:
      traffic count


/comment/
      getComments/:post_id
      getCommentsByLikes/:post_id
      addComment
      deleteComment/:comment_id
      updateComment/:comment_id
