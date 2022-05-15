import express from "express";
import users from "../controller/users";
import auth from "../controller/auth";

const router = express.Router();

router.get("/", auth, users.get);
router.get("/token", auth, users.verifyToken);
router.get("/comments", auth, users.getMyComment);
router.post("/signup", users.signUp);

router.patch("/", auth, users.changeNickname);
router.get("/kakao", users.kakaoLogin);
router.get("/google", users.googleLogin);
router.post("/logout", users.logout);

export default router;
