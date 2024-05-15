import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import initDatabase from "./initDatabase.js";
import authRoutes from "./API/routes/auth.js";
import postRoutes from "./API/routes/post.js";
import commentRoutes from "./API/routes/comment.js";
import userRoutes from "./API/routes/user.js";
import followRoutes from "./API/routes/follow.js";
import reactRoutes from "./API/routes/react.js";
import activitiesRoutes from "./API/routes/activities.js";
import searchRoutes from "./API/routes/search.js";
import { createAccessToken, createRefreshToken, refreshAccessToken } from "./API/controller/jwt.js";
import rateLimiterMiddleware from "./API/middleware/ratelimiter.js";

/* CONFIGUARATION */
dotenv.config();
const app = express();
const port = 3000;

app.use(rateLimiterMiddleware)
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors with credentials
app.use(
  cors({
    origin: process.env.REACT_APP_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    credentials: true
  })
);

/* ROUTES */
app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/react", reactRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/search", searchRoutes);

// Test send cookies
app.get("/cookies", (req, res) => {
  const accessToken = createAccessToken({
    "id": 1,
    "createAt": new Date(),
  });

  // Create refresh token
  const refreshToken = createRefreshToken({
    "id": 1,
  });

  // Send cookies
  res.cookie('access', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });

  res.cookie('refresh', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });

  res.send("Cookies sent");
});

/* SERVER */
app.listen(port, async () => {
  try {
    await initDatabase();
  } catch (err) {
    console.log(err.message);
    return;
  }
  console.log(`Server is listening on port ${port}`);
});
