import Telegraf, { ContextMessageUpdate } from 'telegraf';

export class BillySharer {
  bot : Telegraf<ContextMessageUpdate>;

  constructor(token: string) {
    this.bot = new Telegraf(token);
  }
}