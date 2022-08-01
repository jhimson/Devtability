const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://catcollector-with-toys-and-pics1.s3.amazonaws.com/blankuser.png',
    },
    accountabilityPartner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: '62e5d02994bd214f8966cdec',
    },
    linkedIn: { type: String, default: null },
    github: { type: String, default: null },
    title: { type: String, default: 'Software Engineer' },
    emailToken: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);
