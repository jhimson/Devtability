const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: String,
    isEdited: { type: Boolean, default: false },
    updated: { type: Date, default: null },
    likes: { type: Array },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
  },
  {
  timestamps: true,
  }
);

module.exports = model('Comment', CommentSchema);
