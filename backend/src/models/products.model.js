const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id ASC';
  const [products] = await connection.execute(query);
  return camelize(products);
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[productId]] = await connection.execute(query, [id]);
  return camelize(productId);
};

const create = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return { id: insertId, name };
};

module.exports = {
  getAll,
  getById,
  create,
};