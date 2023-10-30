const dateMocked = '2023-09-15T20:42:59.000Z';

const sales = [
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

const sale = [
  {
    date: '2023-10-30T21:18:04.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-10-30T21:18:04.000Z',
    productId: 2,
    quantity: 10,
  },
];

const reqBody = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const getAllSalesFromService = {
  status: 200,
  data: sales,
};

const getSaleByIdFromService = {
  status: 200,
  data: sale,
};

const saleInvalidFromService = {
  status: 404,
  message: 'Sale not found',
};

const saleCreatedFromService = {
  status: 201,
  data: { id: 1, itemsSold: reqBody },
};

module.exports = {
  getAllSalesFromService,
  getSaleByIdFromService,
  saleInvalidFromService,
  saleCreatedFromService,
};