import { Router } from "express";

import {
  getUser,
  getOneProduct,
  CreateUser,
  updateProduct,
  deletepost,
  searchProducts,
} from "../Controller/productController";
import upload from "../utils/multer";
const router = Router();

router.route("/").get(getUser);
router.route("/:id").get(getOneProduct);
router.route("/create").post(upload, CreateUser);
router.route("/update/:id").patch(upload, updateProduct);
router.route("/delete/:id").delete(deletepost);
router.route("/search").get(searchProducts);

export default router;
