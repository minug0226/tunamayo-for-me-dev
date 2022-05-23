import { Request, Response } from "express";
import { CustomRequest } from "../customType/middleware";
import { DB } from "../data-source";
import { Report } from "../entity/Report";

const reportController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const reportList = await DB.manager.find(Report, {
        relations: {
          user: true,
        },
      });
      return res.status(200).json({ reportList });
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const report = await DB.manager.findOne(Report, {
        where: { id },
        relations: {
          user: true,
        },
      });
      return res.status(200).json({ report });
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  postReport: async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const { reportTitle, reportContent, reportType } = req.body;
    try {
      await DB.manager.insert(Report, {
        reportTitle,
        reportContent,
        reportType,
        userId,
      });

      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};

export default reportController;
