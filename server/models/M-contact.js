const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ContactSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contacts: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('Contact', ContactSchema);
