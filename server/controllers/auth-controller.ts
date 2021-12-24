import { User, Auth } from "../models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

const SECRET = "asdasdasdasdasd12343253453";
function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function authUser(email, fullName, password) {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      fullName,
    },
  });
  const [auth, authCreate] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(password),
      user_id: user.get("id"),
    },
  });
  return auth;
}

export async function authToken(email, password) {
  const auth = await Auth.findOne({
    where: {
      email,
      password: getSHA256ofString(password),
    },
  });

  if (auth) {
    const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
    return { token };
  } else {
    return false;
  }
}

export async function editMyData(userId, body) {
  const { fullName, password } = body;
  const auth = await Auth.update(
    { password: getSHA256ofString(password) },
    {
      where: {
        id: userId,
      },
    }
  );
  const user = await User.update(
    { fullName },
    {
      where: {
        id: userId,
      },
    }
  );
  return user;
}
