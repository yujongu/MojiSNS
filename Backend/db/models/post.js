const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({ // need to add more
    USER_ID: { 
        type: String,
        required: true
    },

    TOPIC_ID: {
        type: String,
        required: true
    },

    LIKES_COUNT: {
        type: Number,
        default: 0
    },

    COMMENTS_COUNT: {
        type: Number,
        default: 0
    },

    BODY: {
        type: String,
        required: true
    },
    
    LIKED_USERS: {
        type: [String]  // USER_ID
    }

}, { timestamps: true});

const Post = mongoose.model('Post', postSchema); //first is collection name in db. second is object type
module.exports = Post;