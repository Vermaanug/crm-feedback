import express from "express";
import {
  submitFeedback,
} from "../controllers/feedback.controller.js";
import { validateFeedbackSubmission } from "../validation/feedback.validator.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();


router.post("/submit", validateFeedbackSubmission, asyncHandler(submitFeedback));

export default router;
