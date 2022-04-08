const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    // need to add more
    USER_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    TOPIC_NAME: {
      type: String,
      required: true,
    },

    TOPIC_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    LIKES_COUNT: {
      type: Number,
      default: 0,
    },

    COMMENTS_COUNT: {
      type: Number,
      default: 0,
    },

    BODY: {
      type: String,
      required: true,
    },

    LIKED_USERS: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // USER_ID
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema); //first is collection name in db. second is object type
module.exports = Post;
