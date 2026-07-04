import express from "express";
import {
  getFeedback,
  getFeedbackSummary,
  submitFeedback,
} from "../controllers/feedback.controller.js";
import { validateFeedbackSubmission } from "../validation/feedback.validator.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { rateLimiter } from "../middleware/ratelimiter.js";

const router = express.Router();


router.get("/summary", asyncHandler(getFeedbackSummary));
router.get("/", asyncHandler(getFeedback));
router.post("/submit", rateLimiter, validateFeedbackSubmission, asyncHandler(submitFeedback));



export default router;
