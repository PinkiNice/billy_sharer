const mongoose = require('mongoose');
import { IUser } from '@/db/typings';

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: {
      unique: true,
    },
  },
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
  purchases: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Purchase',
      required: false,
      default: [],
    },
  ],
}) as IUser;

export const User = mongoose.model('User', userSchema);
