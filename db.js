const mysql = require("mysql2/promise");

async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlPW",
    database: "crud",
  });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return global.connection;
}
connect();

async function selectClientes() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM clientes;");
  return rows;
}
async function insertCliente(cliente) {
  const conn = await connect();
  const sql = "INSERT INTO clientes(nome,idade,uf) VALUES(?,?,?);";

  if (
    cliente.idade > 199 ||
    cliente.nome.lenght >= 150 ||
    cliente.idade < 0 ||
    cliente.nome === null ||
    cliente.nome.trim() == ""
  ) {
    return;
  }
  return await conn.query(sql, [cliente.nome, cliente.idade, cliente.uf]);
}
async function selectCliente(id) {
  const conn = await connect();
  const sql = "SELECT * FROM clientes WHERE id=?;";
  const [rows] = await conn.query(sql, [id]);
  console.log(rows);
  return rows && rows.lenght > 0 ? {} : rows[0];
}
async function updateCliente(id, cliente) {
  const conn = await connect();
  const sql = "UPDATE clientes SET nome= ? , idade= ? , uf= ? WHERE id = ? ;";
  if (
    cliente.idade > 199 ||
    cliente.nome.lenght >= 150 ||
    cliente.idade < 0 ||
    cliente.nome === null ||
    cliente.nome.trim() == ""
  ) {
    console.log("Deu erro");
    return;
  }
  await conn.query(sql, [cliente.nome, cliente.idade, cliente.uf, id]);
}
async function deleteCliente(id) {
  const conn = await connect();
  const sql = "DELETE FROM clientes WHERE id = ?";
  return await conn.query(sql, [id]);
}
module.exports = {
  selectClientes,
  insertCliente,
  selectCliente,
  updateCliente,
  deleteCliente,
};
