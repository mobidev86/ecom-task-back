var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  discountSlab: Number,
});

var Product = mongoose.model("Product", productSchema);
module.exports = Product;
