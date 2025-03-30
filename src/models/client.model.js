module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      telefone: {
        type: DataTypes.STRING(20),
      },
      endereco: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "client",
      timestamps: false,
    }
  );
};
