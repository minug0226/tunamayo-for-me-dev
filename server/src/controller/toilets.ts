import { Request, Response } from "express";
import { CustomRequest } from "../customType/middleware";
import { DB } from "../data-source";
import { Toilet } from "../entity/Toilet";
import { Comment } from "../entity/Comment";

const toiletController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const toiletList = await DB.manager.find(Toilet);
      return res.status(200).json({ toiletList });
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { toiletId } = req.params;
      const toiletInfo = await DB.manager.findOne(Toilet, {
        where: { id: Number(toiletId) },
      });
      return res.status(200).json({ toiletInfo });
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  getComments: async (req: Request, res: Response) => {
    try {
      const { toiletId } = req.params;
      const commentList = await DB.manager.find(Comment, {
        where: { toiletId: Number(toiletId) },
      });
      return res.status(200).json({ commentList });
    } catch (err) {
      res.sendStatus(500);
    }
  },

  postComment: async (req: CustomRequest, res: Response) => {
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
      return res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  patchComment: async (req: CustomRequest, res: Response) => {
    const commentId = Number(req.params.commentId);
    const { content, rating } = req.body;

    try {
      await DB.manager.update(Comment, commentId, { content, rating });
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  deleteComment: async (req: CustomRequest, res: Response) => {
    const commentId = Number(req.params.commentId);
    try {
      await DB.manager.delete(Comment, commentId);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};

export default toiletController;
