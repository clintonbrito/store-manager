const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = require('chai');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { getProductByIdFromModel, getAllProductsFromDB, productCreatedFromModel } = require('../mocks/productsModel.mock');
const { productUpdatedFromModel } = require('../mocks/productsService.mock');

describe('Test - Products Service:', function () {
  it('should return all products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(getAllProductsFromDB);

    const productsServiceResponse = await productsService.getAll();

    const expectedResult = { status: 200, data: getAllProductsFromDB };

    expect(productsServiceResponse).to.be.deep.equal(expectedResult);
  });

  it('should return a product by id if productId exists', async function () {
    sinon.stub(productsModel, 'getById').resolves(getProductByIdFromModel);

    const productId = 2;
    const productsByIdServiceResponse = await productsService.getById(productId);

    const expectedResult = { status: 200, data: getProductByIdFromModel };

    expect(productsByIdServiceResponse).to.be.deep.equal(expectedResult);
  });

  it('should return 404 status and message `Product not found` if productId does not exist', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const productId = 9999;
    const productsByIdServiceResponse = await productsService.getById(productId);

    const expectedResult = { status: 404, message: 'Product not found' };

    expect(productsByIdServiceResponse).to.be.deep.equal(expectedResult);
  });

  it('should return an object with status 201 after create a new product', async function () {
    sinon.stub(productsModel, 'create').resolves(productCreatedFromModel);

    const name = 'Pílulas de Nanicolina';
    const productCreated = await productsService.create(name);
    // console.log(productCreated);

    const expectedResult = { status: 201, data: productCreatedFromModel };

    expect(productCreated).to.be.deep.equal(expectedResult);
  });

  it('should return an object with status 200 after updating an existing product', async function () {
    sinon.stub(productsModel, 'update').resolves(productUpdatedFromModel);

    const name = 'Laço da Verdade';
    const id = 3;
    const productUpdated = await productsService.update(name, id);
    // console.log(productCreated);

    const expectedResult = { status: 200, data: productUpdatedFromModel };

    expect(productUpdated).to.be.deep.equal(expectedResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});