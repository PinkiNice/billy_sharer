import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

export class Api {
  mongo : any;

  constructor(mongo: any) {
    this.mongo = mongo;
  }

  addUser(id): void {
    // create new user object in database, id - unique telegram chat identifier
    console.log(`Add user with id ${id}`);
  }
}