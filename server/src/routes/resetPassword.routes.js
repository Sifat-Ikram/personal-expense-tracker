import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/resetPassword.controller.js";

const router = express.Router();

// @route   POST /api/auth/forgot-password
// @desc    Send password reset link (returns link for now)
// @access  Public
router.post("/forgot-password", forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset user password
// @access  Public
router.post("/reset-password", resetPassword);

export default router;
