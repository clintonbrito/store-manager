const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT SP.sale_id, S.date, SP.product_id, SP.quantity
    FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY sale_id, product_id;`;
  const [sales] = await connection.execute(query);
  // console.log(camelize(sales));
  return camelize(sales);
};

const getById = async (id) => {
  const query = `SELECT S.date, SP.product_id, SP.quantity
    FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id
    WHERE SP.sale_id = ?
    ORDER BY sale_id, product_id;`;
  const [saleId] = await connection.execute(query, [id]);
  // console.log(saleId);

  return camelize(saleId);
};

const createSaleId = async () => {
  const saleDate = new Date();

  const query = 'INSERT INTO sales (date) VALUES (?);';
  const [{ insertId }] = await connection.execute(query, [saleDate]);
  // console.log(insertId);

  return insertId;
};

const create = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';

  const newSale = await connection.execute(query, [saleId, productId, quantity]);
  console.log(camelize(newSale));

  return camelize(newSale);
};

const productIdExistsInDB = async (productId) => {
  const query = 'SELECT id FROM products WHERE id = ?';

  const [product] = await connection.execute(query, [productId]);

  return product.length !== 0;
};

module.exports = {
  getAll,
  getById,
  create,
  createSaleId,
  productIdExistsInDB,
};