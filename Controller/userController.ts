import userModel from "../model/userModel";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { recieveOrder } from "../email/email";

const getUser = async (req: Request, res: Response) => {
  try {
    const userdata = await userModel.find();
    return res.status(200).json({
      message: "Users data",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const CreateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fullname, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const userdata = await userModel.create({
      fullname,
      email,
      password: hashed,
    });

    recieveOrder(email, fullname)
      .then((result) => {
        console.log("Mail Sent", result);
      })
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json({
      message: "Users data updated successfully",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const signinUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      const checkpassword = await bcrypt.compare(password, findUser.password);
      if (checkpassword) {
        const { ...info } = findUser._doc;

        return res.status(200).json({
          message: " welcome back",
          data: info,
        });
      } else {
        return res.status(404).json({ message: `password is incorrect` });
      }
    } else {
      return res.status(404).json({
        message: `user dosent exist`,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `error ${error}` });
  }
};

export { getUser, CreateUser, signinUser };
