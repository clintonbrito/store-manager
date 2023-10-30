const salesModel = require('../models/sales.model');

const getAll = async () => {
  const sales = await salesModel.getAll();
  // console.log(sales);
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  // console.log(sale);

  if (!sale || (Array.isArray(sale) && sale.length === 0)) {
    return { status: 404, message: 'Sale not found' };
  }

  return { status: 200, data: sale };
};

const create = async (reqBody) => {
  const saleId = await salesModel.createSaleId();

  await Promise.all(reqBody.map(async (eachProductSold) => {
    const { productId, quantity } = eachProductSold;

    return salesModel.create(saleId, productId, quantity);
  }));

  // console.log(sale);

  return { status: 201, data: { id: saleId, itemsSold: reqBody } };
};

module.exports = {
  getAll,
  getById,
  create,
};