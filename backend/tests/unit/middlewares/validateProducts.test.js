const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = require('chai');

const productsModel = require('../../../src/models/products.model');
const validateProducts = require('../../../src/middlewares/validateProducts');
const { productInvalidFromModel } = require('../mocks/productsModel.mock');
const { productUpdatedOkFromModel } = require('../mocks/productsService.mock');

describe('Test - Products Middleware:', function () {
  it('should return an object with status 400 after trying to create a product with invalid `name`', async function () {
    sinon.stub(productsModel, 'productIdExistsInDB').resolves(); // O que eu deveria colocar aqui?

    const name = null;
    const req = { body: { name } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
  
    await validateProducts.validateProducts(req, res, next);
    // console.log(productUpdated);
    const expectedResult = { status: 400, data: { message: '"name" is required' } };

    expect(res.status).to.have.been.calledWith(expectedResult.status);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('should return an object with status 422 after trying to create a product with less than 5 characters for `name`', async function () {
    sinon.stub(productsModel, 'productIdExistsInDB').resolves(); // O que eu deveria colocar aqui?

    const name = 'Bill';
    const req = { body: { name } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
  
    await validateProducts.validateProducts(req, res, next);
    // console.log(productUpdated);
    const expectedResult = { status: 422, data: { message: '"name" length must be at least 5 characters long' } };

    expect(res.status).to.have.been.calledWith(expectedResult.status);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('`next()`should be called after trying to create a product with correct inputs', async function () {
    sinon.stub(productsModel, 'productIdExistsInDB').resolves(); // O que eu deveria colocar aqui?

    const name = 'Laço da Verdade';

    const req = { body: { name } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
  
    await validateProducts.validateProducts(req, res, next);
    // console.log(productUpdated);
    // const expectedResult = { status: 200, data: productUpdatedOkFromModel };

    expect(next).to.have.been.calledWith();
  });

  it('should return an object with status 404 after trying to update an invalid product', async function () {
    sinon.stub(productsModel, 'productIdExistsInDB').resolves(productInvalidFromModel);

    const id = 9999999999;
    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
  
    await validateProducts.checkIfProductIdExists(req, res, next);
    // console.log(productUpdated);
    const expectedResult = { status: 404, data: { message: 'Product not found' } };

    expect(res.status).to.have.been.calledWith(expectedResult.status);
    expect(res.json).to.have.been.calledWith(expectedResult.data);
  });

  it('should return an object with status 200 after trying to update an existing product', async function () {
    sinon.stub(productsModel, 'productIdExistsInDB').resolves(productUpdatedOkFromModel);

    const id = 3;
    const name = 'Laço da Verdade';

    const req = { params: { name, id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();
  
    await validateProducts.checkIfProductIdExists(req, res, next);
    // console.log(productUpdated);
    // const expectedResult = { status: 200, data: productUpdatedOkFromModel };

    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});