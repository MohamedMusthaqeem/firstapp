import mongoose from "mongoose";
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    console.log(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log("make sure that everything is correct" + err);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connect;
