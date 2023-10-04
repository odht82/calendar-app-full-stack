const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", },
  title: { type: String, required: [true, "Please add a Title"], match: [/^.{0,25}$/, "Title should be less than 25 characters"], },
  start: String,
  end: String,
  description: String,
  allDay: { type: Boolean, default: false, },
  freq: { type: String, default: 'none' },
  interval: { type: String },
  dtstart: { type: String },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
