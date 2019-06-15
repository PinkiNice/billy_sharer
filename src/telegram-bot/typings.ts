import { ContextMessageUpdate } from 'telegraf';
import { IUser, IPurchase } from '@/db/typings';

export interface StatefulContextMessageUpdate extends ContextMessageUpdate {
  state: {
    mentionedUsers: Array<IUser>;
    user: IUser;
  };
}
