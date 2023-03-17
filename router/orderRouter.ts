import { Router } from "express";
import { createOrder, getOrders } from "../Controller/orderController";

const router = Router();

router.route("/").get(getOrders);
router.route("./newOrder").post(createOrder);

export default router;
