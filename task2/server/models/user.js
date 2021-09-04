const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String },
    birthday: { type: Date },
  },
  { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
);

module.exports = mongoose.model("Users", userSchema);
