const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please add a name"] },
  email: { type: String, unique: true },
  password: { type: String, },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
