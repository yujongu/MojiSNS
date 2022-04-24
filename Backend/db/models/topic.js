const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  TOPIC_NAME: {
    type: String,
    required: true,
  },

  TOPIC_TRAFFIC_COUNT: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
