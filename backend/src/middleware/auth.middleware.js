const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "No autorizado" });
  }

  try {
    jwt.verify(token, "secreto123");
    next();
  } catch {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
