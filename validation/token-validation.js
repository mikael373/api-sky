const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyToken = async (req, res, next) => {
  let tokenWithBearer = req.header("authorization");
  if (!tokenWithBearer || !tokenWithBearer.startsWith("Bearer")) {
    tokenWithBearer = req.header("Authentication");
    if (!tokenWithBearer || !tokenWithBearer.startsWith("Bearer")) {
      return res.status(401).json({ error: "Não autorizado" });
    }
  }
  const bearer = tokenWithBearer.split(" ");
  const token = bearer[1];
  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    req["tokenReq"] = token;
    next();
  } catch (err) {
    res.status(400).json({ error: "Não autorizado" });
  }
};

module.exports = verifyToken;
