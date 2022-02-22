const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    POST_ID: { //post where comment is made
        type: String,
        required: true
    },

    OWNER_ID: {
        type: Number,
        required: true
    },

    CONTENT: {
        type: String,
        required: true
    },

    PARENT_ID: { // parent comment id
        type: String,
        required: true
    },
    
    LIKES_COUNT: {
      type: Number,
      default: 0
    },

}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema); //first is collection name in db. second is object type
module.exports = Comment;