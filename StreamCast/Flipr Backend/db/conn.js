const mongoose = require("mongoose");
const DB = process.env.DATABASE || 'mongodb+srv://prakash:flipr@flipr.pmaoyhw.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    console.log("Database connected Successful");
  })
  .catch((err) => {
    console.log("Error  in conncting to database:- ",err);
  });
