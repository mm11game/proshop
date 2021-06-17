import { Router } from "express";
import asyncHandler from "express-async-handler";
import { nextTick } from "process";

const router = Router();
import Product from "../models/productModel.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(401);
      throw new Error("Product not FOund");
    }
    //체크. 여기서 throw를 하게되면? 무조건 catch로 넘어간다.
  } catch (err) {
    console.log("캐치");
    console.log("에러는?", err);
    next(err);
    //체크.
    //asyncHandler는 next(err)를 해주는거다.
    // 즉 다음 미들웨어가 err를 받는다.
  }
});

export default router;
