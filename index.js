import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import scanRoute from './routes/scans.js'
import messageRoute from "./routes/messages.js";
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  Credentials: true,
};

//Database connection
mongoose.set("strictQuery", false);
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

//middlewares

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/scan', scanRoute);
app.use("/api/v1/chatbot", messageRoute);

app.listen(port, () => {
  connection();
  console.log("Server Listening to port ", port);
});
