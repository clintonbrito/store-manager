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
  it('should return an object with status 404 after trying to update an invalid product', async function () {
    // estou confundindo toda hora o que colocar dentro do "resolves"
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