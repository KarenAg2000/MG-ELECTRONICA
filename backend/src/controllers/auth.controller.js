const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { nombres, email, password } = req.body;

  if (!nombres || !email || !password) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  const hashed = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO usuarios (nombres,email,password) VALUES (?,?,?)";

  db.query(sql, [nombres, email, hashed], (err) => {
    if (err) {
      return res.status(400).json({ msg: "Correo ya registrado" });
    }

    res.json({ msg: "Usuario registrado correctamente" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email=?";

  db.query(sql, [email], (err, result) => {

    if (result.length === 0) {
      return res.status(401).json({ msg: "Usuario no existe" });
    }

    const user = result[0];
    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, "secreto123", {
      expiresIn: "1h",
    });

    res.json({ msg: "Login correcto", token });
  });
};