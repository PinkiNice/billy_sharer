const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export async function getDbConnection() {
  mongoose.connect('mongodb://127.0.0.1:27017/billy_sharer', {
    useNewUrlParser: true,
  });
}
