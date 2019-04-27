import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { Api } from './api';

export class BillySharer {
  instance : Telegraf<ContextMessageUpdate>;
  token: string;
  api: Api;

  constructor(token: string, api: Api) {
    this.token = token;
    this.api = api;

    this.__init(token);
  }

  __init(token: string) {
    this.instance = new Telegraf(token);

    this.__setHooks();
  }

  __setHooks() {
    this.instance.on('message', (ctx) => {
      console.log(ctx);
      this.api.addUser(ctx);
    })
  }
}