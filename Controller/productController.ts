import productSchema from "../model/Product";
import { Request, Response, Router } from "express";
import cloudinary from "../utils/cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const getUser = async (req: Request, res: Response) => {
  try {
    const userdata = await productSchema.find();
    return res.status(200).json({
      message: "products data",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const getOneProduct = async (req: Request, res: Response) => {
  try {
    const userdata = await productSchema.findById(req.params.id);
    return res.status(200).json({
      message: "products data",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const CreateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      Name,
      Amount,
      Description,
      details,

      qty,
      category,
    } = req.body;

    const cloudImage = await cloudinary.uploader.upload(req?.file!.path);
    const userdata = await productSchema.create({
      Name,
      Amount,
      Description,
      image: cloudImage.secure_url,
      imageID: cloudImage.public_id,

      details,

      qty,
      category,
      uniqueNumber: 100 + Math.floor(Math.random() * 1000),
    });
    return res.status(200).json({
      message: "products data updated successfully",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const check = await productSchema.findById(req.params.Id);
    if (check) {
      const { Name, Amount, Description, qty, category, uniqueNumber } =
        req.body;

      cloudinary.uploader.destroy(check?.imageID);
      const cloudImage = await cloudinary.uploader.upload(req.file?.path!);

      const updateProduct = await productSchema.findByIdAndUpdate(
        req.params.id,
        {
          Amount,
          Description,
          qty,
          category,
          uniqueNumber,
          image: cloudImage.secure_url,
          imageID: cloudImage.public_id,
        },
        { new: true }
      );

      return res.status(201).json({
        message: "product has been updated",
        data: updateProduct,
      });
    } else {
      return res.status(404).json({
        message: "cant perform update",
      });
    }
  } catch (error) {
    return res.status(404).json({
      messsage: "An Error occurred",
      data: error,
    });
  }
};

const deletepost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productDelete = await productSchema.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      message: "delete successful",
      data: productDelete,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const searchProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newQuery = req.query;
    const product = await productSchema.find(newQuery);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

export {
  getUser,
  getOneProduct,
  CreateUser,
  updateProduct,
  deletepost,
  searchProducts,
};
