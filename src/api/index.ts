import { User } from '@/db/models/User';

export async function createNewUser(id, username) {
  let existingUser = User.findOne({ id });

  if (existingUser) {
    return;
  }

  let user = new User({
    username: username,
    id: id,
  });

  await user.save();

  return user;
}

export async function syncUserUsername(id, username) {
  User.updateOne({ id }, { username });
}

export async function getUser(id, username) {
  let promise = User.findOne({ id });
  let user = await promise;

  if (user) {
    user.update({ username });
  } else {
    user = new User({
      id,
      username,
    });
  }

  await user.save();
  return user;
}

export async function getUserByUsername(username) {
  console.log('searching for', username);
  let user = await User.findOne({ username });
  console.log('User: ', user);
  return user;
}

export const Api = {
  getUser,
};

export async function getAllUsers() {
  return User.find();
}
