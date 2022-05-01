import express, { Request, Response } from "express";
import { CustomRequest } from "../customType/middleware";
import { DB } from "../data-source";
import { Report } from "../entity/Report";
import auth from "../controller/auth";
const router = express.Router();

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const reportList = await DB.manager.find(Report);
    return res.status(200).json(reportList);
  } catch (err) {
    return res.sendStatus(500);
  }
});
router.post("/", auth, async (req: CustomRequest, res: Response) => {
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
});

export default router;
