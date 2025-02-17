const express = require("express");
const { response } = require("../app");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("newClient", { title: "Cadastro de Cliente", action: "/new" });
});

router.post("/", (req, res, next) => {
  res.redirect("/?new=true");
});
module.exports = router;
