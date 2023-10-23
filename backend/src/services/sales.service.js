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
    return {
      status: 404,
      message: 'Sale not found',
    };
  }
  return { status: 200, data: sale };
};

const create = async (productId, quantity) => {
  const saleId = await salesModel.createSaleId();

  const sale = await salesModel.create(productId, quantity, saleId);

  console.log(sale);

  if (sale.status !== undefined) {
    return {
      status: 422,
      message: 'Failed to create sale: invalid data or data conflict',
    };
  }

  // return { status: 201, data: sale };
  return { status: 201,
    data: {
      id: saleId,
      itemsSold: sale,
    },
  };
};

module.exports = {
  getAll,
  getById,
  create,
};