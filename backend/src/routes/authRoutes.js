import { Router } from "express";
import { register, login, updateProfile } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update-profile", updateProfile);

export default router;
