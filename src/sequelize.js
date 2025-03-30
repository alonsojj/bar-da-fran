const { Sequelize, DataTypes } = require("sequelize");

const ClientModel = require("./models/client.model");
const ProductModel = require("./models/product.model");
const OrderModel = require("./models/order.model");
const OrderedItemModel = require("./models/orderedItem.model");

const sequelize = new Sequelize("mysqlDB", "root", "mysqlPW", {
  host: "localhost",
  dialect: "mysql",
});

const Client = ClientModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const OrderedItem = OrderedItemModel(sequelize, DataTypes);

function setupAssociations() {
  Client.hasMany(Order, {
    foreignKey: "clientId",
    as: "orders",
  });

  Order.belongsTo(Client, {
    foreignKey: "clientId",
    as: "client",
  });

  Order.belongsToMany(Product, {
    through: OrderedItem,
    foreignKey: "orderId",
    otherKey: "productId",
    as: "products",
  });

  Product.belongsToMany(Order, {
    through: OrderedItem,
    foreignKey: "productId",
    otherKey: "orderId",
    as: "orders",
  });
}

// Verificar conexão e sincronizar
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    setupAssociations();
    await sequelize.sync({ force: true });
    console.log("Banco de dados conectado e sincronizado!");
  } catch (error) {
    console.error("Falha na inicialização:", error);
  }
}

initializeDatabase();

module.exports = {
  Client,
  Product,
  Order,
  OrderedItem,
};
