const salesModel = require('../models/sales.model');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: null, data: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) {
    return {
      status: 'HTTP_NOT_FOUND',
      data: { message: 'Sale not found' },
    };
  }
  return { status: null, data: sale };
};

const create = async (productId, quantity) => {
  const saleId = await salesModel.createSaleId();
  const sale = await salesModel.create({ productId, quantity }, saleId);

  if (sale.status) {
    return {
      status: 'HTTP_INVALID_VALUE',
      data: { message: sale.data.message },
    };
  }

  return { status: null, data: sale };
};

module.exports = {
  getAll,
  getById,
  create,
};