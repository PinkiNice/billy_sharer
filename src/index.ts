import mongoose from 'mongoose';
import { token } from './config';
import { BillySharer } from './bot';
import { Api } from './api';
import { getDbConnection } from './db';


async function main() : void {
  let connection = await getDbConnection();
  let api = new Api(connection);

  let bot = new BillySharer(token, api);
}

main();