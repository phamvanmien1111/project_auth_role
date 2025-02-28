import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./auth.routes";

export default function setupRoutes(app: Express) {
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json()); 
  app.use("/api/auth", authRoutes);
}
