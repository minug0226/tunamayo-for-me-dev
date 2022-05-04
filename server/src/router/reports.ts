import express from "express";
import auth from "../controller/auth";
import reports from "../controller/reports";

const router = express.Router();

router.get("/", auth, reports.getAll);
router.post("/", auth, reports.postReport);

export default router;
