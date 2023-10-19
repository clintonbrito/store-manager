const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { productsMock, productsByIdMock } = require('../mocks/products.mock');

describe('Test products model', function () {
  it('should return all products', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const products = await productsModel.getAll();

    expect(products).to.be.deep.equal(productsMock);
  });

  it('should return a product by id if productId exist', async function () {
    sinon.stub(connection, 'execute').resolves([[productsByIdMock]]);

    const productId = 1;
    const productsById = await productsModel.getById(productId);

    expect(productsById).to.be.deep.equal(productsByIdMock);
  });

  it('should return 404 status and message `Product not found` if productId not exist', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const productId = 9999;
    const productsById = await productsModel.getById(productId);

    expect(productsById).to.be.deep.equal({
      status: 'HTTP_NOT_FOUND',
      data: { message: 'Product not found' },
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});