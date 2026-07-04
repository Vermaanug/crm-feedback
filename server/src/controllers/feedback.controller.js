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

// GET /api/feedback?category=&search=&page=&limit=
export async function getFeedback(req, res) {
  const { category, search, page = 1, limit = 20 } = req.query;

  const query = {};
  if (category) query.category = category;
  if (search) query.$text = { $search: search };

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

  const [items, total] = await Promise.all([
    Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Feedback.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
}

// GET /api/feedback/summary
export async function getFeedbackSummary(req, res) {
  const [totalCount, categoryBreakdown, recent] = await Promise.all([
    Feedback.countDocuments(),
    Feedback.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Feedback.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalCount,
      categoryBreakdown: categoryBreakdown.map((c) => ({
        category: c._id,
        count: c.count,
      })),
      recent,
    },
  });
}


