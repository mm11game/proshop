import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js";
import products from "./data/products.js";

import User from "./models/useModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";
import destroy from "destroy";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const creatUsers = await User.insertMany(users);
    const adminUser = creatUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported");
    process.exit();
  } catch (err) {
    console.log(`Error : ${err}`);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (err) {
    console.log(`Error : ${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
