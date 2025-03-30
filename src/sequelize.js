const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const ClientModel = require("./models/client.model");
const ProductModel = require("./models/product.model");
const OrderModel = require("./models/order.model");
const OrderedItemModel = require("./models/orderedItem.model");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    syncOptions:
      process.env.NODE_ENV == "development" ? { alter: true } : { force: true },
    loggin: process.env.NODE_ENV == "development" ? false : console.log,
    dialectOptions:
      process.env.NODE_ENV == "development"
        ? {}
        : {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
  }
);
console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  syncOptions:
    process.env.NODE_ENV == "development" ? { alter: true } : { force: true },
  loggin: process.env.NODE_ENV == "development" ? false : console.log,
  dialectOptions:
    process.env.NODE_ENV == "development"
      ? {}
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
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
    console.log("Conectado ao banco");
    setupAssociations();
    await sequelize.sync({ force: true });
    console.log("Banco de dados sincronizado!");
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
