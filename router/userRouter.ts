import { Router } from "express";

import { getUser, CreateUser, signinUser } from "../Controller/userController";

import upload from "../utils/multer";

const router = Router();

router.route("/").get(getUser);
router.route("/create").post(upload, CreateUser);
router.route("/signin").post(signinUser);

export default router;
