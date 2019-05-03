import { getDbConnection } from './db';
import { BillySharer } from './bot';
import { token } from './config';

async function main() {
  let connection = await getDbConnection();

  let bot = new BillySharer(token);
  bot.run();
}

main();
