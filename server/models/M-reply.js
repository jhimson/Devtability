const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReplySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Reply', ReplySchema);
