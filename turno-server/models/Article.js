const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    paragraphs: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
