const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../validation/user-validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: "E-mail já existente" });
  }
  const salt = await bcrypt.genSalt(10);
  const senha = await bcrypt.hash(req.body.senha, salt);
  const user = new User({
    nome: req.body.nome,
    email: req.body.email,
    senha,
    telefones: req.body.telefones,
    data_criacao: Date.now(),
    data_atualizacao: Date.now(),
    ultimo_login: Date.now(),
  });

  try {
    user.token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.TOKEN_SECRET
    );
    await user.save();
    res.json({
      id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Usuário e/ou senha inválidos" });
  }
  const validsenha = await bcrypt.compare(req.body.senha, user.senha);
  if (!validsenha) {
    return res.status(401).json({ error: "Usuário e/ou senha inválidos" });
  }
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  user.ultimo_login = Date.now();
  user.token = token;
  user.data_atualizacao = Date.now();
  try {
    const savedUser = await user.save();
    res.json({
      id: savedUser._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
