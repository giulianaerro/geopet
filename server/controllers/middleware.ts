import * as jwt from "jsonwebtoken";

const SECRET = "asdasdasdasdasd12343253453";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch {
    res.status(401).json({ error: true });
  }
}

export async function reqBody(req, res, next) {
  if (req.body) {
    next();
  } else {
    res.status(401).send("No hay body");
  }
}
