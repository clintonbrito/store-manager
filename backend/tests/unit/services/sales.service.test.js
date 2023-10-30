const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = require('chai');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { getAllSalesFromModel, getUndefinedSaleFromModel, getSaleByIdFromModel, saleCreatedFromModel, saleIdFromModel } = require('../mocks/salesService.mock');

describe('Test - Sales Service:', function () {
  it('should return all sales', async function () {
    sinon.stub(salesModel, 'getAll').resolves(getAllSalesFromModel);

    const sales = await salesService.getAll();
    // console.log(sales);

    const expectedResult = { status: 200, data: getAllSalesFromModel };

    expect(sales).to.be.deep.equal(expectedResult);
  });

  it('should return a sale by id if saleId exists', async function () {
    sinon.stub(salesModel, 'getById').resolves(getSaleByIdFromModel);

    const id = 1;
    const sale = await salesService.getById(id);

    const expectedResult = { status: 200, data: getSaleByIdFromModel };

    expect(sale).to.be.deep.equal(expectedResult);
  });

  it('should return object with 404 status', async function () {
    sinon.stub(salesModel, 'getById').resolves(getUndefinedSaleFromModel);

    const id = 999;
    const sale = await salesService.getById(id);

    const expectedResult = { status: 404, message: 'Sale not found' };

    expect(sale).to.be.deep.equal(expectedResult);
  });

  it('should return an object with status 201 after create a new sale', async function () {
    sinon.stub(salesModel, 'create').resolves(saleCreatedFromModel);
    sinon.stub(salesModel, 'createSaleId').resolves(saleIdFromModel);

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

    const saleCreated = await salesService.create(reqBody);

    const expectedResult = { status: 201, data: { id: saleIdFromModel, itemsSold: reqBody } };
    // console.log(saleCreated);

    expect(saleCreated).to.be.deep.equal(expectedResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});