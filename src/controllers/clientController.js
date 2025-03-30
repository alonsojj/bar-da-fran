const { Client } = require("../sequelize");

const clientController = {
  // Listar todos clientes (GET /clientes)
  async index(req, res) {
    try {
      const results = await Client.findAll({
        order: [["id"]],
      });
      res.render("clientList", { results });
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  },

  // Exibir formulário de criação (GET /clientes/new)
  create(req, res) {
    res.render("newClient", {
      title: "Novo Cliente",
      action: "/client/new",
      result: {},
    });
  },

  // Salvar novo cliente (POST /clientes)
  async store(req, res) {
    try {
      const { nome, idade, email, tel } = req.body;

      const novoCliente = await Client.create({
        nome,
        idade: parseInt(idade),
        email,
        tel,
      });

      res.redirect("/client");
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

  // Exibir formulário de edição (GET /clientes/:id/edit)
  async edit(req, res) {
    try {
      const cliente = await Client.findByPk(req.params.id);

      if (!cliente) {
        return res.status(404).render("error", {
          error: { status: 404, message: "Cliente não encontrado" },
        });
      }

      res.render("clientes/new", {
        title: "Editar Cliente",
        action: `/clientes/${cliente.id}?_method=PUT`,
        result: cliente,
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  },

  // Atualizar cliente (PUT /clientes/:id)
  async update(req, res) {
    try {
      const cliente = await Client.findByPk(req.params.id);

      if (!cliente) {
        return res.status(404).render("error", {
          error: { status: 404, message: "Cliente não encontrado" },
        });
      }

      const { nome, idade, uf } = req.body;

      await cliente.update({
        nome,
        idade: parseInt(idade),
        uf,
      });

      res.redirect("/clientes");
    } catch (error) {
      console.error(error);
      res.status(400).render("clientes/new", {
        title: "Editar Cliente",
        action: `/clientes/${req.params.id}?_method=PUT`,
        result: req.body,
        error: "Erro ao atualizar. Verifique os dados.",
      });
    }
  },

  // Excluir cliente (DELETE /clientes/:id)
  async destroy(req, res) {
    try {
      const cliente = await Client.findByPk(req.params.id);

      if (!cliente) {
        return res.status(404).render("error", {
          error: { status: 404, message: "Cliente não encontrado" },
        });
      }

      await cliente.destroy();
      res.redirect("/clientes");
    } catch (error) {
      console.error(error);
      res.status(500).render("error", { error });
    }
  },
};

module.exports = clientController;
