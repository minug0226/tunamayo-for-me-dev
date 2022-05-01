import express, { Request, Response } from "express";
import { CustomRequest } from "../customType/middleware";
import { DB } from "../data-source";
import { Toilet } from "../entity/Toilet";
import { Comment } from "../entity/Comment";
import dotenv from "dotenv";
import auth from "../controller/auth";

dotenv.config();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const toiletList = await DB.manager.find(Toilet);
    return res.status(200).json(toiletList);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get("/:toiletId", async (req: Request, res: Response) => {
  try {
    const { toiletId } = req.params;
    const toiletInfo = await DB.manager.findOne(Toilet, {
      where: { id: Number(toiletId) },
    });
    return res.status(200).json(toiletInfo);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/:toiletId/comments", async (req: Request, res: Response) => {
  try {
    const { toiletId } = req.params;
    const commentList = await DB.manager.findOne(Comment, {
      where: { toiletId: Number(toiletId) },
    });
    return res.status(200).json(commentList);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post(
  "/:toiletId/comments",
  auth,
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const toiletId = Number(req.params.toiletId);
    const { content, rating } = req.body;
    try {
      await DB.manager.insert(Comment, {
        userId,
        toiletId,
        content,
        rating,
      });
      return res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

router.patch(
  "/:toiletId/comments/:commentId",
  auth,
  async (req: CustomRequest, res: Response) => {
    const commentId = Number(req.params.commentId);
    const { content, rating } = req.body;

    try {
      await DB.manager.update(Comment, commentId, { content, rating });
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:toiletId/comments/:commentId",
  auth,
  async (req: CustomRequest, res: Response) => {
    const commentId = Number(req.params.commentId);

    try {
      await DB.manager.delete(Comment, commentId);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
);

export default router;
