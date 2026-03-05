import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  })
);
app.use(cookieParser());

// test route
app.get("/health-check", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Health good and server is up and running",
  });
});

app.get("/test", async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany();
    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.log(error);
  }
});

import userRouter from "./routes/user.route.js";
import agentRouter from "./routes/agent.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/notes", noteRouter);
