const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { salesMock, salesByIdMock } = require('../mocks/sales.mock');

describe('Test - Sales Model:', function () {
  it('should return all sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await salesModel.getAll();

    expect(sales).to.be.deep.equal(salesMock);
  });

  it('should return a sale by id if saleId exist', async function () {
    sinon.stub(connection, 'execute').resolves([[salesByIdMock]]);

    const saleId = 1;
    const salesById = await salesModel.getById(saleId);

    expect(salesById).to.be.deep.equal(salesByIdMock);
  });

  it('should return 404 status and message `Sale not found` if saleId not exist', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const saleId = 9999;
    const salesById = await salesModel.getById(saleId);

    expect(salesById).to.be.deep.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});