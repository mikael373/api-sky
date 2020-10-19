const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const tokenWithBearer = req.header("authorization");
  if (!tokenWithBearer) return res.status(401).json({ error: "acesso negado" });
  const bearer = tokenWithBearer.split(' ')
  const token = bearer[1]
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "token inválido" });
  }
};

module.exports = verifyToken;
