var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var orderSchema = new Schema(
  {
    product_info: Array,
    user: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "User" },
    total: Number,
    discountValid: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["orderPlaced", "sent", "cancel", "inTransit"],
      default: "orderPlaced",
    },
  },
  { timestamps: true }
);

var Order = mongoose.model("Order", orderSchema);
module.exports = Order;
