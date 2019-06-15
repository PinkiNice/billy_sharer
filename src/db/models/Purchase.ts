import { IPurchase } from '@/db/typings';

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  id: Number,
  description: {
    type: String,
    // required user to write at least something inside
    required: true,
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  payers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
}) as IPurchase;

export const Purchase = mongoose.model('Purchase', purchaseSchema);
