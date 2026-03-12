const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/perfil", authMiddleware, (req, res) => {
  res.json({
    msg: "Acceso autorizado",
    usuario: req.userId
  });
});

module.exports = router;