var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var offerSchema = new Schema({
  title: String,
  description: String,
  image: String,
});

var Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
