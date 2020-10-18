import "@babel/polyfill";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import startDB from "./utils/mongooseLoader";
import cors from "cors";

//import routers
import imageRoutes from "./routes/image";

require("dotenv").config();
startDB(process.env.NODE_ENV);

const app = express();

//Load Express Middlewares
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set API Endpoints
app.use("/api/v1/images", imageRoutes);

//Handle Invalid routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

export default app;
