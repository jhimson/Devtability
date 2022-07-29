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
      type: Array,
    },
    isEdited: { type: Boolean, default: false },
    updated: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Reply', ReplySchema);
