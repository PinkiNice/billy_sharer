const mongoose = require('mongoose');

type UserType = {
  id: number;
  username: string;
  friends: Array<UserType>;
};

let userSchema = new mongoose.Schema({
  id: Number,
  username: {
    type: String,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
      default: [],
    },
  ],
}) as UserType;

export let User = mongoose.model('User', userSchema);
