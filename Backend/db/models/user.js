const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  USER_EMAIL: {
    type: String,
    required: [true, "Enter your email!"],
  },

  USER_USERNAME: {
    type: String,
    required: [true, "Enter your username!"],
  },

  USER_PW: {
    type: String,
    required: [true, "Enter your password!"],
  },

  USER_BIRTHDAY: {
    type: Date,
    default: Date.now(),
  },

  USER_DESCRIPTION: {
    type: String,
    default: "",
  },

  USER_SEX: {
    type: String,
    enum: ["Male", "Female", "Not Sure"],
    default: "Not Sure",
  },

  FOLLOWING_USERS: {
    type: [
      {
        USER_ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        FOLLOW_DATE: Date,
      },
    ],
  },

  FOLLOWER_USERS: {
    type: [
      {
        USER_ID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        FOLLOW_DATE: Date,
      },
    ],
  },

  FOLLOWING_TOPICS: {
    type: [
      {
        type: String,
      },
    ],
  },

  FOLLOWING_TOPICS_Obj: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },

  DAILY_VISITOR_COUNT: {
    type: Number,
    default: 0,
  },

  TOTAL_VISITOR_COUNT: {
    type: Number,
    default: 0,
  },

<<<<<<< HEAD
    USER_DESCRIPTION: {
        type: String,
        default: "",
    },

    USER_SEX: {
        type: String,
        enum: ['Male', 'Female', 'Not Sure'],
        default: 'Not Sure'
    },

    FOLLOWING_USERS: {
        type: [{
          USER_ID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
          FOLLOW_DATE: Date
        }]
    },

    FOLLOWER_USERS: {
        type: [{
          USER_ID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
          FOLLOW_DATE: Date
        }]
    },

    FOLLOWING_TOPICS: {
        type: [{
          type: String,
        }]
    },

    PROFILE_PICTURE: {
      type: Buffer // casted to MongoDB's BSON type: binData
    },

    USER_BLOCKLIST: {
      type: [{
        USER_ID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
      }]
    }
=======
  PROFILE_PICTURE: {
    type: Buffer, // casted to MongoDB's BSON type: binData
  },
>>>>>>> 50ad8ee2dbc9ae279822e8c9569c2b47821b3c48
});

module.exports = mongoose.model("User", userSchema);
