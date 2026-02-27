import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { agentChat } from "../controllers/agent.controller.js";
import { validateData } from "../middleware/validate.middleware.js";
import { sendMessageSchema } from "../validations/message.schema.js";

const router = express.Router();

router
  .route("/chat")
  .post(validateData(sendMessageSchema), verifyJwt, agentChat);

export default router;
