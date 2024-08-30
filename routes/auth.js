import express from "express";
import { login, register, requestPasswordReset, verifyOtpAndResetPassword } from "../controllers/authController.js";

const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// Request password reset route
router.post("/request-password-reset", requestPasswordReset);

// Verify OTP and update password route
router.post("/verify-otp-and-reset-password", verifyOtpAndResetPassword);

export default router;
