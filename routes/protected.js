const router = require("express").Router();
const User = require("../model/User");

router.get("/:userId", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const pathId = req.params["userId"];

  const tokenId = user._id.toString();
  if (user.token !== req["tokenReq"] || pathId !== tokenId) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  const horarioNow = new Date();
  const minutosDeDiferencaLogin = Math.round(
    (user.ultimo_login - horarioNow) / 60000
  );
  if (minutosDeDiferencaLogin <= -30) {
    return res.status(401).json({ error: "Sessão inválida" });
  }
  res.json(user);
});

module.exports = router;
