const dateMocked = '2023-09-15T20:42:59.000Z';

const getAllSalesFromModel = [
  {
    saleId: 1,
    date: dateMocked,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateMocked,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateMocked,
    productId: 3,
    quantity: 15,
  },
];

const getSaleByIdFromModel = [
  {
    saleId: 1,
    date: dateMocked,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateMocked,
    productId: 2,
    quantity: 10,
  },
];

const getUndefinedSaleFromModel = [];

const saleCreatedFromModel = [[{ insertId: 1 }], []];

const saleIdFromModel = 1;

module.exports = {
  getAllSalesFromModel,
  getSaleByIdFromModel,
  getUndefinedSaleFromModel,
  saleCreatedFromModel,
  saleIdFromModel,
};