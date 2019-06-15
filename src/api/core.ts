import { User } from '@/db/models/User';
import { User as TgUser } from 'telegram-typings';
import { ERRORS } from './errors';

type Purchase = {
  total: number;
  description: string;
};

export async function getUser(tgUser: TgUser) {
  if (tgUser.is_bot) {
    throw new Error(ERRORS.IS_BOT);
  } else if (!tgUser.username) {
    throw new Error(ERRORS.NO_USERNAME);
  }

  let existingUser = await User.findOne({ id: tgUser.id });

  if (existingUser) {
    return;
  }

  let user = new User({
    username: tgUser.username,
    id: tgUser.id,
  });

  await user.save();

  return user;
}
export async function isFriends(firstUserId: number, secondUserId: number) {
  // checks if two users are friends
  return true;
}
export async function makeFriends(firstUserId: number, secondUserId: number) {
  // makes a connection between two users
}
export async function addPurchase(
  buyerId: number,
  payersIds: Array<number> | number,
  purchase: Purchase,
) {
  // adds single purchase
  // updates debts of payers relative to buyer
}
export async function calculateDebtAmount(
  fromUserId: number,
  toUserId: number,
): Promise<number> {
  // calculates how much fromUserId should pay toUserId

  // !!!One Directional!!!
  // always returns positive amount

  return 0;
}
export async function pay(
  fromUserId: number,
  toUserId: number,
  amount: number,
) {
  // makes payment fromUserId => toUserId

  // returns how much remaining debt is
  return 0;
}
