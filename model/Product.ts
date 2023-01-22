import mongoose, { Mongoose } from "mongoose";

type newproductSchema = {
  Name: string;
  Amount: number;
  Description: string;
  image: string;
  imageID: string;
  details: string;
  qty: number;
  category: string;
  uniqueNumber: number;
};

interface newproduct extends newproductSchema, mongoose.Document {}

const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Amount: {
      type: Number,
    },
    Description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    details: {
      type: String,
    },
    qty: {
      type: Number,
    },
    category: {
      type: String,
    },
    uniqueNumber: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model<newproductSchema>("product", productSchema);
