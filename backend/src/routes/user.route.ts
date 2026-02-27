import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { validateData } from "../middleware/validate.middleware.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/auth.scehma.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(validateData(registerUserSchema), registerUser);
router.route("/login").post(validateData(loginUserSchema), loginUser);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/logout").get(verifyJwt, logoutUser);

export default router;
