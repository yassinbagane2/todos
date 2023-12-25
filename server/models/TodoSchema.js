const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "To do",
  },
});

module.exports = mongoose.model("Todo", todoSchema);
