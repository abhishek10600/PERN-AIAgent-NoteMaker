import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../lib/prisma.js";
import { comparePassword, encryptPassword } from "../utils/auth/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth/jwt.js";
import { setAuthCookies } from "../utils/auth/helper.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const hashedPassword = await encryptPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          },
          accessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );
  } catch (error: unknown) {
    console.error("Regsiter User Error: ", error);

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    console.log({ isPasswordCorrect });

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          },
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
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
