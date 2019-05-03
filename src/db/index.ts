const mongoose = require('mongoose');

import { User } from './models/User';

async function initModels() {
  await User.createCollection();
}
export async function getDbConnection() {
  mongoose.connect('mongodb://127.0.0.1:27017/billy_sharer', {
    useNewUrlParser: true,
  });
  await initModels();
}
