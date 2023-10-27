const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/products.model');
const validateProducts = require('../../../src/middlewares/validateProducts');
const { productInvalidFromModel } = require('../mocks/productsModel.mock');

chai.use(sinonChai);

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

  afterEach(function () {
    sinon.restore();
  });
});