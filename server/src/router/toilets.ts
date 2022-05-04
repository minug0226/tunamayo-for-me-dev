import express from "express";
import auth from "../controller/auth";
import toilets from "../controller/toilets";

const router = express.Router();

router.get("/", toilets.getAll);
router.get("/:toiletId", toilets.getById);

router.get("/:toiletId/comments", toilets.getComments);
router.post("/:toiletId/comments", auth, toilets.postComment);
router.patch("/:toiletId/comments/:commentId", auth, toilets.patchComment);
router.delete("/:toiletId/comments/:commentId", auth, toilets.deleteComment);

export default router;
