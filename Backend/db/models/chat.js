const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
      // need to add more
      ROOM_NAME: {
        type: String,
        required: true,
      },
  
      CHAT_OWNER_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  
      CHAT_MESSAGE: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Chat", chatSchema);
