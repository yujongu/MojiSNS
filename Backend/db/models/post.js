const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({ // need to add more
    userid: { 
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    image: {
        type: String, // TODO: image, gif files
        required: false
    }

}, { timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;