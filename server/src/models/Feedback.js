import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Product", "Support", "Billing", "Feature Request", "Other"],
        message: "{VALUE} is not a supported category",
      },
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [5, "Comment must be at least 5 characters"],
      maxlength: [2000, "Comment must be under 2000 characters"],
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
  },
  { timestamps: true } 
);

feedbackSchema.index({ category: 1 });
feedbackSchema.index({ comment: "text" });

export default mongoose.model("Feedback", feedbackSchema);
