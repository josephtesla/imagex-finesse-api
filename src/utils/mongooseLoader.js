import mongoose from "mongoose";

require("dotenv").config();

const startDB = (NODE_ENV) => {
  let MONGODB_URI;

  switch (NODE_ENV) {
    case "development":
      MONGODB_URI = "mongodb://127.0.0.1:27017/imagex-api-dev";
      break;
    case "test":
      MONGODB_URI = process.env.MONGODB_URI_TEST;
      break;
    case "production":
      MONGODB_URI = process.env.MONGODB_URI_PROD;
      break;
    default:
      throw Error(
        `MongoDB configuration for environment: "${NODE_ENV}" not found`
      );
  }

  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB database connected! : " + MONGODB_URI);
    })
    .catch((error) => console.log(error.message));
};

export default startDB;
