const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ msg: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "secreto123", (err, decoded) => {

    if (err) {
      return res.status(401).json({ msg: "Token inválido o expirado" });
    }

    req.userId = decoded.id;

    next();
  });

};