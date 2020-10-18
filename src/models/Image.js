import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  url: {
    type: String,
    default: "",
  },

  public_id: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Image", imageSchema);
