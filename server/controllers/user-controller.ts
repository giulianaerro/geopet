import { User } from "../models";

export async function findByEmail(email: string) {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return true;
  } else {
    return false;
  }
}

export async function findUser(userId) {
  const user = await User.findByPk(userId);
  return user;
}
