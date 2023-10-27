const dateMocked = '2023-09-15T20:42:59.000Z';

const salesMock = [
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

const salesByIdMock = [
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

const salesByIdNotFoundMock = {
  status: 'HTTP_NOT_FOUND',
  data: { message: 'Sale not found' },
};

const saleCreatedFromDB = [[
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
], []];

module.exports = {
  salesMock,
  salesByIdMock,
  salesByIdNotFoundMock,
  saleCreatedFromDB,
};