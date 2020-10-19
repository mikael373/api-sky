const router = require("express").Router();
const User = require("../model/User");

router.get("/", async (req, res) => {
  // const user = await User.findOne({ email: req.user.email });
  res.json({
    error: null,
    data: {
      title: "Rota protegida",
      user: req.user,
    },
  });
});

module.exports = router;
