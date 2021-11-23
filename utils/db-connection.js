const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akshay:akshay1221@mongo-db-0.2cjuy.mongodb.net/ecomTask",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection failed"));
db.once("open", function () {
  console.log("Database connected successfully!");
});
