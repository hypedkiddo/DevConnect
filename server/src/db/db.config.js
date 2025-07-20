
import dotenv from "dotenv";
dotenv.config(); // This must come before importing Prisma Client

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL); 

import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient({
  log: ["query"],
});

export default prisma;