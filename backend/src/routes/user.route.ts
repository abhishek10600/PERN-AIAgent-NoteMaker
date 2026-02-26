import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { validateData } from "../middleware/validate.middleware.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/auth.scehma.js";

const router = express.Router();

router.route("/register").post(validateData(registerUserSchema), registerUser);
router.route("/login").post(validateData(loginUserSchema), loginUser);

export default router;
