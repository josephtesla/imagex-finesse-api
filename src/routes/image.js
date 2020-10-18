import express from "express";
import * as Image from "../controllers/image";
import { storageUpload } from "../utils/cloudinary";

const imageroutes = express();

imageroutes.get("/", Image.getAll);
imageroutes.get("/:imageId", Image.getOne);
imageroutes.post("/", storageUpload.any(), Image.create);
imageroutes.delete("/:imageId", Image.deleteOne);

export default imageroutes;
