const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../model/User");


const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  const isEmailExist = await User.findOne({ email: req.body.email });

  if (isEmailExist)
    return res.status(400).json({ error: "email já registrado" });

  const salt = await bcrypt.genSalt(10);
  const senha = await bcrypt.hash(req.body.senha, salt);


  const user = new User({
    nome: req.body.nome,
    email: req.body.email,
    senha,
    data_criacao: Date.now(),
    data_atualizacao: Date.now(),
    ultimo_login: Date.now()
  });

  try {
    const savedUser = await user.save();
    user.token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    await user.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ error: "email incorreto" });

  const validsenha = await bcrypt.compare(req.body.senha, user.senha);
  if (!validsenha)
    return res.status(400).json({ error: "senha incorreta" });

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  user.ultimo_login = Date.now();
  try {
    const savedUser = await user.save();
    res.header("auth-token", token).json({
      error: null,
      data: {
        token,
      },
    });
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }


});

module.exports = router;
