const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
// const createSaleId = require('../../../src/models/sales.model');
const salesModel = require('../../../src/models/sales.model');
const {
  salesMock,
  salesByIdMock,
} = require('../mocks/salesModel.mock');

describe('Test - Sales Model:', function () {
  it('should return all sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await salesModel.getAll();

    expect(sales).to.be.deep.equal(salesMock);
  });

  it('should return a sale by id if saleId exist', async function () {
    sinon.stub(connection, 'execute').resolves([salesByIdMock]);

    const saleId = 1;
    const salesById = await salesModel.getById(saleId);

    expect(salesById).to.be.deep.equal(salesByIdMock);
  });

  it('should return 404 status and message `Sale not found` if saleId not exist', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const saleId = 9999;
    const salesById = await salesModel.getById(saleId);

    expect(salesById).to.be.deep.equal(undefined);
  });

  // it('should return an array with two elements after create a new sale', async function () {
  //   // o que entra no 'resolves' é o RETORNO da QUERY da model:
  //   sinon.stub(connection, 'execute').resolves(saleCreatedFromDB);

  //   // tenho que fazer um stub no 'saleId'?
  //   // sinon.stub(createSaleId).resolves('???');
  //   const saleId = 999;
  //   const productId = 1;
  //   const quantity = 5;

  //   const saleCreated = await salesModel.create(saleId, productId, quantity);

  //   // RETORNO da MODEL:
  //   const expectedResult = [[
  //     {
  //       fieldCount: 0,
  //       affectedRows: 1,
  //       insertId: 0,
  //       info: '',
  //       serverStatus: 2,
  //       warningStatus: 0,
  //     },
  //     undefined,
  //   ],
  //   [
  //     {
  //       fieldCount: 0,
  //       affectedRows: 1,
  //       insertId: 0,
  //       info: '',
  //       serverStatus: 2,
  //       warningStatus: 0,
  //     },
  //     undefined,
  //   ]];

  //   expect(saleCreated).to.be.deep.equal(expectedResult);
  // });

  afterEach(function () {
    sinon.restore();
  });
});