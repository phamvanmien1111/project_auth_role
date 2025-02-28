// import express from "express";
// import connectDB from "./config/db"; 
// import dotenv from "dotenv";
// import router from "./routers/app"; 

// dotenv.config();
// const app = express();

// app.use(express.json());

// router(app);

// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db"; 
import authRoutes from "./routers/auth.routes"; 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Kết nối database rồi chạy server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
