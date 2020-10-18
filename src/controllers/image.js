import mongoose from "mongoose";
import Image from "../models/Image";
import fs from "fs";
import { upload } from "../utils/cloudinary";

export const getAll = async (req, res) => {
  try {
    const images = await Image.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ data: images });
  } catch (error) {
    return res.status(500).json({ error: "Error while getting images" });
  }
};

export const getOne = async (req, res) => {
  try {
    const imageId = req.params.imageId;

    /**If an invalid id is passed */
    if (!mongoose.Types.ObjectId.isValid(imageId))
      return res.status(400).json({ error: "Invalid Image ID" });

    const image = await Image.findOne({ _id: imageId });
    return res.status(200).json({ data: image });
  } catch (error) {
    return res.status(500).json({ error: "Error while getting image" });
  }
};

export const create = async (req, res) => {
  //Images upload
  const images = [];

  if (req.files && req.files.length) {
    try {
      for (const file of req.files) {
        const filePath = file.path;
        const resp = await upload(filePath);
        const { url, public_id } = resp;
        images.push({ url, public_id });
        fs.unlinkSync(filePath);
      }
      const data = await Image.insertMany(images);
      return res
        .status(201)
        .json({ message: "Images uploaded successfully!", data: data[0] });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error While Uploading Images!" });
    }
  }
};

export const deleteOne = async (req, res) => {
  try {
    const imageId = req.params.imageId;

    /**If an invalid id is passed */
    if (!mongoose.Types.ObjectId.isValid(imageId))
      return res.status(400).json({ error: "Invalid Image ID" });

    await Image.deleteOne({ _id: imageId });
    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error while deleting image" });
  }
};
