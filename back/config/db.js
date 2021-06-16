import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // 2번 3번줄이 없는데도 왜? env가 작동하는거지?

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongo db connect > : ${conn.connection.host}`);
  } catch (err) {
    console.log(`error : ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
