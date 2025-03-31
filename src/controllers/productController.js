const { Client, Product } = require("../sequelize");

const productController = {
  async index(req, res) {
    try {
      const result = await Product.findAll({
        order: [["id"]],
      });
      res.render("itemList", { title: "Produtos", type: "products", result });
    } catch (error) {
      onsole.error(error);
      res.status(500).render("error", { error });
    }
  },
  async create(req, res) {
    res.render("newItem", {
      title: "Produtos",
      type: "products",
      action: "/products/new",
      result: {},
    });
  },
  async store(req, res) {
    try {
      const { nome, preco, quantidade_em_stock } = req.body;
      const newProduct = await Product.create({
        nome,
        preco,
        quantidade_em_stock: parseInt(quantidade_em_stock),
      });
    } catch (error) {
      console.error(error);
      res.status(400).render("clientes/new", {
        title: "Novo Cliente",
        action: "/clientes",
        result: req.body,
        error: "Dados inválidos. Verifique as informações.",
      });
    }
  },
};

module.exports = productController;
