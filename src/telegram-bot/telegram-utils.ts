import { User } from 'telegram-typings';

type TelegramInlineButton = {
  text: string;
  callback: string;
};
export function sendMessageWithInlineButtons(
  to: User,
  buttons: Array<TelegramInlineButton>,
) {}
