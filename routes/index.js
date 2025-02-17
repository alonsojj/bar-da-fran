const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const results = await global.db.selectClientes();
    console.log(results);
    res.render("index", { results });
  } catch (error) {
    res.redirect("/?error" + error);
  }
});
router.get("/new", (req, res, next) => {
  res.render("newClient", {
    title: "Cadastro de Cliente",
    result: {},
    action: "/new",
  });
});

router.post("/new", async (req, res, next) => {
  const nome = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf;
  console.log(req.body);
  try {
    global.db.insertCliente({ nome, idade, uf });
    res.redirect("/?new=true");
  } catch (error) {
    res.redirect("?erro=" + error);
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await global.db.selectCliente(id);
    res.render("newClient", {
      title: "Edição de cliente",
      result: result,
      action: "/edit/" + id,
    });
  } catch (error) {
    res.redirect("?erro=" + error);
  }
});
router.post("/edit/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf;
  try {
    await global.db.updateCliente(id, { nome, idade, uf });
    res.redirect("/?edit=true");
  } catch (error) {
    res.redirect("/?erro=" + error);
  }
});
router.get("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await global.db.deleteCliente(id);
    res.redirect("/?delete=true");
  } catch (error) {
    res.redirect("/?erro=" + error);
  }
});

module.exports = router;
