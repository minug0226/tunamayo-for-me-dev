import { Response, NextFunction } from "express";
import { CustomRequest } from "../customType/middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface UserData {
  id: number;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  try {
    if (!token) return res.status(403).json({ message: "Not authorized" });

    const userData = jwt.verify(
      token,
      process.env.JWT_SECRET! as string
    ) as UserData;
    const userId = userData.id;

    if (!userId) return res.status(403).json({ message: "Invalid token" });

    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default auth;
