import { StatefulContextMessageUpdate } from '../typings';
import { getUser } from '@/api/core';
import { ERRORS } from '@/api/errors';

const UserObjectMiddleware = async function(
  ctx: StatefulContextMessageUpdate,
  next: Function,
) {
  console.log('[UserObject middleware]');
  if (!ctx.message) {
    next();
    return;
  }

  try {
    ctx.state.user = await getUser(ctx.from);
  } catch (error) {
    if (error.message == ERRORS.NO_USERNAME) {
      ctx.reply(
        'Looks like you dont have a username. You should set one to join my club.',
      );
    }
  }

  return next();
};
