const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: { type: String },
    todayText: { type: String },
    tomorrowText: { type: String },
    blockersText: { type: String },
    image: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    datePosted: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
