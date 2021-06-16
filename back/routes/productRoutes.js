import { Router } from "express";
import asyncHandler from "express-async-handler";

const router = Router();
import Product from "../models/productModel.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      //이쪽으로 접근이 안 됐다. 왜 이러는걸까?
      //찾아보니까 그냥 17번 라인에서 에러가 나서 그냥 터져버린다. 즉, throw Error를 해버리는 상황이다. ㅠ
      res.send("noooooooo product");
    }
  })
);

export default router;
