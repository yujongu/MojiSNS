const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  RECEP_USER_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  SENDER_USER_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  NOTIF_TYPE: {
    type: Number,
    default: 0,
  },
  BODY: {
    type: String,
  },
  VIEWED: {
    type: Boolean,
    default: false
  }
}, { timestamps: true});

module.exports = mongoose.model("Notification", notificationSchema);
