var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);
module.exports = User;
