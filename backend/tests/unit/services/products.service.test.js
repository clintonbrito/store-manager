const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { productsMock, productsByIdMock } = require('../mocks/products.mock');

describe('Test - Products Service:', function () {
  it('should return all products', async function () {
    sinon.stub(productsService, 'getAll').resolves(productsMock);

    const productsModelResponse = await productsModel.getAll();
    const productsServiceResponse = await productsService.getAll();

    const responseObj = { status: null, data: productsModelResponse };

    expect(productsServiceResponse).to.be.deep.equal(responseObj);
    });

  it('should return a product by id if productId exist', async function () {
    sinon.stub(productsService, 'getById').resolves(productsByIdMock);

    const productId = 2;

    const productsByIdModelResponse = await productsModel.getById(productId);
    const productsByIdServiceResponse = await productsService.getById(productId);

    const responseObj = { status: null, data: productsByIdModelResponse };

    expect(productsByIdServiceResponse).to.be.deep.equal(responseObj);
  });

  it('should return 404 status and message `Product not found` if productId not exist', async function () {
    sinon.stub(productsService, 'getById').resolves([]);

    const productId = 9999;

    const productsByIdModelResponse = await productsModel.getById(productId);
    const productsByIdServiceResponse = await productsService.getById(productId);

    const responseObj = {
      status: 'HTTP_NOT_FOUND',
      data: productsByIdModelResponse,
    };

    expect(productsByIdServiceResponse).to.be.deep.equal(responseObj);
  });

  afterEach(function () {
    sinon.restore();
  });
});