import Feedback from "../models/Feedback.js";

export async function submitFeedback(req, res) {
  const { category, comment, email } = req.body;

  const feedback = await Feedback.create({
    category,
    comment: comment.trim(),
    email: email?.trim() || null,
  });

  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    data: feedback,
  });
}


