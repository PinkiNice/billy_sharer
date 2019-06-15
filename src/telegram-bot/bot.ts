import Telegraf, { ContextMessageUpdate, Context, Telegram } from 'telegraf';
import { getUser, getUserByUsername, getAllUsers } from '../api';
import { User, InlineQuery } from 'telegram-typings';

interface StatefulContextMessageUpdate extends ContextMessageUpdate {
  state: {
    mentionedUsers: Array<User>;
    user: User;
  };
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
  telegram: Telegram;

  constructor(token: string) {
    this.token = token;

    this.__init(token);
  }

  __init(token: string) {
    this.instance = new Telegraf(token);
    this.telegram = this.instance.telegram;

    this.telegram.sendMessage(74169393, 'Restared!');

    getAllUsers().then(console.log);
    this.__setMiddlewares();
    this.__setHooks();
  }
  __setMiddlewares() {
    this.instance.use(UserObjectMiddleware);
    this.instance.use(MentionsMiddleware);
  }

  __setHooks() {
    this.instance.on('callback_query', something => {
      console.log(something);
    });
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

  sendContactRequest(from: User, to: User) {
    //this.telegram.sendMessage(to.id, )
    this.telegram.sendMessage(from.id, 'Your request is sent');
    //this.telegram.sendMessage(to.)
  }

  handleContactRequestResponse(response: InlineQuery) {}
}
