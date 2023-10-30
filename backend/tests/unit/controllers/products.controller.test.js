const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const { getAllProductsFromService, getProductByIdFromService, productInvalidFromService, productCreatedFromService } = require('../mocks/productsController.mock');

describe('Test - Products Controller:', function () {
  it('should return all products', async function () {
    sinon.stub(productsService, 'getAll').resolves(getAllProductsFromService);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAll(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAllProductsFromService.data);
  });

  it('should return a product by id if productId exist', async function () {
    sinon.stub(productsService, 'getById').resolves(getProductByIdFromService);

    const id = 3;

    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getProductByIdFromService.data);
  });

  it('should return 404 status and message `Product not found` if productId not exist', async function () {
    sinon.stub(productsService, 'getById').resolves(productInvalidFromService);

    const id = 999;

    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('should return an object with `id` and `name` after created a new product', async function () {
    sinon.stub(productsService, 'create').resolves(productCreatedFromService);

    const name = { name: 'Laço da Verdade' };

    const req = { body: name };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreatedFromService.data);
  });

  // it('should return a message after trying to create an invalid product', async function () {
  //   sinon.stub(productsService, 'create').resolves(productInvalidCreatedFromService);

  //   const name = { name: 'Asdf' };

  //   const req = { body: name };
  //   const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

  //   await productsController.create(req, res);

  //   expect(res.status).to.have.been.calledWith(201);
  //   expect(res.json).to.have.been.calledWith(productCreatedFromService.data);
  // });

  // it('should return an object with `id` and `name` after update an existing product', async function () {
  //   sinon.stub(productsService, 'update').resolves(productUpdatedFromService);

  //   const id = 3;
  //   const name = { name: 'Laço da Verdade' };

  //   const req = { params: { id }, body: name };
  //   const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

  //   await productsController.update(req, res);

  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(productCreatedFromService.data);
  // });

  afterEach(function () {
    sinon.restore();
  });
});