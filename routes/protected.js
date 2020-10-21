const router = require("express").Router();
const User = require("../model/User");

router.get("/:userId", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const pathId =  req.params['userId']
  if (user.token !== req['tokenReq']) {
    return res.status(400).json({ error: "Não autorizado" });
  }
  // TODO implementar verificação se o último login foi feito a menos que 30 minutos atrás
  res.json({
    error: null,
    data: {
      title: "Rota protegida",
      user: user,

    },
  });
});

module.exports = router;
