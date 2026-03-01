import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { runAgent } from "../ai/agent.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const agentChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    // console.log({ userId });
    const { message } = req.body;

    const result = await runAgent(userId, message);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          data: result,
        },
        "Task executed"
      )
    );
  } catch (error: unknown) {
    console.error("Login User Error: ", error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });
  }
};
