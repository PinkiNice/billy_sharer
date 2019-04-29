const mongoose = require('mongoose');

export function getDbConnection() {
  return mongoose.createConnection('mongodb://127.0.0.1:27017/billy_sharer', {
    useNewUrlParser: true,
  });
}
