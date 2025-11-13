import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/users.model";
import { sample_users } from "../data";
import { Router } from "express";
import { User } from "../models/users.model";
import jwt from "jsonwebtoken";
import bysrypt from "bcryptjs";

export const usersRouter = Router();

usersRouter.get(
  "/seeds",
  expressAsyncHandler(async (req, res) => {
    const count = await UserModel.countDocuments();
    if (count > 0) {
      res.send("Seed is already done!");
      return;
    }
    await UserModel.create(sample_users);
    res.send(sample_users);
  })
);

usersRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
      res.send(generateToken(user));
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  })
);

const generateToken = (user: User) => {
  // In a real application, use a library like jsonwebtoken to generate a JWT
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "defaultsecret",
    {
      expiresIn: "30d",
    }
  );
  return {
    token,
    ...user,
  };
};

export default usersRouter;
