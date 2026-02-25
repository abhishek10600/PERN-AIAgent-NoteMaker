import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
