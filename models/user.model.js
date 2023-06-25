const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserModel', userSchema);
