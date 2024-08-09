const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://adityabasak360:Aditya_1234@cluster0.icftfll.mongodb.net/expense-tracker",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.on("error", (err) => console.log(err));
connection.on("connected", () =>
  console.log("Mongo DB connection done successfully")
);
