const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { salesMock, salesByIdMock, saleIdCreated, saleCreatedFromDB } = require('../mocks/salesModel.mock');

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

  it('should create a saleId', async function () {
    sinon.stub(connection, 'execute').resolves(saleIdCreated);

    const saleId = await salesModel.createSaleId();

    expect(saleId).to.be.deep.equal(saleIdCreated[0].insertId);
  });

  it('should return an array with two elements after create a new sale', async function () {
    sinon.stub(connection, 'execute').resolves(saleCreatedFromDB);

    const saleId = 999;
    const productId = 1;
    const quantity = 5;

    const saleCreated = await salesModel.create(saleId, productId, quantity);

    // RETORNO da MODEL:
    const expectedResult = [[{ insertId: 1 }], []];

    expect(saleCreated).to.be.deep.equal(expectedResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});