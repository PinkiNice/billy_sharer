import mongoose from 'mongoose';

export function getDbConnection() {
  return mongoose.createConnection('mongodb://localhost/my_database', {useNewUrlParser: true});
}
