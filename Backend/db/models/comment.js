const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    POST_ID: { //post where comment is made
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },

    OWNER_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    CONTENT: {
        type: String,
        required: true
    },

    PARENT_ID: { // parent comment id
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true
    },
    
    LIKES_COUNT: {
      type: Number,
      default: 0
    },
    
    LIKED_USERS: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]  // USER_ID
    }

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema); //first is collection name in db. second is object type
module.exports = Comment;