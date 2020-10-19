const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("conectado ao banco de dados")
);


const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");


app.use(express.json());


app.use("/api/user", authRoutes);
app.use("/api/protected", verifyToken, dashboardRoutes);

app.listen(6767, () => console.log("Servidor rodando na porta 6767"));
