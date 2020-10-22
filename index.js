const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Conexão com banco de dados estabelecida com sucesso!")
);

const authRoutes = require("./routes/auth");
const protectedRouter = require("./routes/protected");
const verifyToken = require("./validation/token-validation");

app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/user", verifyToken, protectedRouter);

app.listen(6767, () => console.log("Servidor rodando na porta 6767"));
