import Telegraf, { ContextMessageUpdate, Context } from 'telegraf';
import { getUser, getUserByUsername, getAllUsers } from './api';

interface StatefulContextMessageUpdate extends ContextMessageUpdate {
  state: any;
}

enum MessageEntity {
  MENTION = 'mention',
}
const UserObjectMiddleware = async function(
  ctx: StatefulContextMessageUpdate,
  next: Function,
) {
  console.log('[UserObject middleware]');
  if (!ctx.message) {
    next();
    return;
  }

  let { id, username } = ctx.from;

  if (!username) {
    ctx.reply(
      'Looks like you dont have a username. You should set one to join my club.',
    );
  } else {
    ctx.state.user = await getUser(id, username);
  }
  return next();
};

const MentionsMiddleware = async function(
  ctx: StatefulContextMessageUpdate,
  next: Function,
) {
  console.log('[Mentions middleware]');
  if (!ctx.message) {
    next();
    return;
  }

  let mentions = ctx.message.entities.filter(
    entity => entity.type == MessageEntity.MENTION,
  );

  //
  let usernames = mentions.map(mention => {
    return ctx.message.text.substring(
      mention.offset + 1,
      mention.offset + mention.length,
    );
  });

  let users = await Promise.all(
    usernames.map(username => getUserByUsername(username)),
  );

  ctx.state.mentionedUsers = users;

  if (users.includes(null)) {
    ctx.telegram.sendMessage(ctx.chat.id, 'Кто-то не зарегался в боте');
    return;
  }

  return next();
};

export class BillySharer {
  instance: Telegraf<StatefulContextMessageUpdate>;
  token: string;

  constructor(token: string) {
    this.token = token;

    this.__init(token);
  }

  __init(token: string) {
    this.instance = new Telegraf(token);
    //this.instance.telegram.sendMessage(74169393, 'Restared!');

    getAllUsers().then(console.log);
    this.__setMiddlewares();
    this.__setHooks();
  }
  __setMiddlewares() {
    this.instance.use(UserObjectMiddleware);
    this.instance.use(MentionsMiddleware);
  }

  __setHooks() {
    this.instance.on('message', ctx => {
      ctx.reply(`received from, ${ctx.state.user.username}`);
    });

    this.instance.start(ctx => {
      ctx.reply(`Happy to see you there ${ctx.from.first_name}`);
    });

    this.instance.command('add', (ctx: StatefulContextMessageUpdate) => {
      ctx.reply('Invite to');
      console.log(ctx.update.message.entities);
    });

    this.instance.catch((err: Error) => {
      console.log(err);
    });
  }

  run() {
    console.log('Bot instance is running');
    this.instance.launch();
  }
}
