import express from "express";
import users from "../controller/users";

const router = express.Router();

router.get("/", users.get);
router.post("/signup", users.signUp);

router.get("/kakao", users.kakaoLogin);
router.get("/google", users.googleLogin);
router.post("/logout", users.logout);

export default router;
