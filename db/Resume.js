const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    resume: {
      type: String,
    },
    resumeId: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("resume", schema);
