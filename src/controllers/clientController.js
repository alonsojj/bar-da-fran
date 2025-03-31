const { Client } = require("../sequelize");

const clientController = {
  async index(req, res) {
    try {
      const result = await Client.findAll({
        order: [["id"]],
      });
      res.render("itemList", {
        title: "clientes",
        type: "clients",
        result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  },

  create(req, res) {
    res.render("newItem", {
      type: "clients",
      action: "/clients/new",
      result: {},
    });
  },

  async store(req, res) {
    try {
      const { nome, idade, email, tel } = req.body;
      console.log(req.body);

      const novoCliente = await Client.create({
        nome,
        idade: parseInt(idade),
        email,
        tel,
      });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(400).render("newItem", {
        title: "Novo Cliente",
        action: "/clients",
        result: req.body,
        error: "Dados inválidos. Verifique as informações.",
      });
    }
  },

  async edit(req, res) {
    try {
      const cliente = await Client.findByPk(req.params.id);

      if (!cliente) {
        return res.status(404).render("error", {
          error: { status: 404, message: "Cliente não encontrado" },
        });
      }

      res.render("newItem", {
        type: "clients",
        title: "Editar Cliente",
        action: "",
        result: cliente,
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  },

  async update(req, res) {
    try {
      const cliente = await Client.findByPk(req.params.id);

      if (!cliente) {
        return res.status(404).render("error", {
          error: { status: 404, message: "Cliente não encontrado" },
        });
      }

      const { nome, idade, email, tel } = req.body;

      await cliente.update({
        nome,
        idade: parseInt(idade),
        email,
        tel,
      });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(400).render("newItem", {
        title: "Editar Cliente",
        action: "",
        result: req.body,
        error: "Erro ao atualizar. Verifique os dados.",
      });
    }
  },

  async delete(req, res) {
    try {
      const cliente = await Client.findByPk(req.params.id);

      if (!cliente) {
        return res.status(404).render("error", {
          error: { status: 404, message: "Cliente não encontrado" },
        });
      }

      await cliente.destroy();
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  },
};

module.exports = clientController;
