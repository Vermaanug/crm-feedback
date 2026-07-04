import { z } from "zod";

const feedbackSchema = z.object({
  category: z.enum([
    "Product",
    "Support",
    "Billing",
    "Feature Request",
    "Other",
  ]),

  comment: z
    .string()
    .trim()
    .min(5, "Comment must be at least 5 characters")
    .max(2000, "Comment must be under 2000 characters"),

  email: z
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
});


export function validateFeedbackSubmission(req, res, next) {
  const result = feedbackSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  req.body = result.data;

  next();
}