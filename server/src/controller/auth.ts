import { Response, NextFunction } from "express";
import { CustomRequest } from "../customType/middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  console.log("cookies : ", req.cookies);
  console.log("token : ", token);
  try {
    if (!token) return res.status(403).json({ message: "Not authorized" });

    const userData: any = jwt.verify(token, process.env.JWT_SECRET! as string);
    const userId = userData.id;

    if (!userId) return res.status(403).json({ message: "invalid token" });

    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default auth;
