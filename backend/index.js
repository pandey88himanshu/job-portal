import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import connectDB from "./connection/db.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
};
app.use(cors(corsOptions));
//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoute);
//default page
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Hello from backend" });
});
//testing page
app.get("/test", (req, res) => {
  res.status(200).json({ success: true, message: "This is testing page" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
