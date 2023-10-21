const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { productsMock, productsByIdMock } = require('../mocks/products.mock');

describe('Test - Products Service:', function () {
  it('should return all products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsMock);

    const productsServiceResponse = await productsService.getAll();

    const responseObj = { status: 200, data: productsMock };

    expect(productsServiceResponse).to.be.deep.equal(responseObj);
  });

  it('should return a product by id if productId exist', async function () {
    sinon.stub(productsModel, 'getById').resolves(productsByIdMock);

    const productId = 2;
    const productsByIdServiceResponse = await productsService.getById(productId);

    const responseObj = { status: 200, data: productsByIdMock };

    expect(productsByIdServiceResponse).to.be.deep.equal(responseObj);
  });

  it('should return 404 status and message `Product not found` if productId not exist', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const productId = 9999;
    const productsByIdServiceResponse = await productsService.getById(productId);

    const responseObj = { status: 404, message: 'Product not found' };

    expect(productsByIdServiceResponse).to.be.deep.equal(responseObj);
  });

  afterEach(function () {
    sinon.restore();
  });
});