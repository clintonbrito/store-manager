const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { getAllSalesFromService, getSaleByIdFromService, saleInvalidFromService, saleCreatedFromService } = require('../mocks/salesController.mock');

describe('Test - Products Controller:', function () {
  it('should return all products', async function () {
    sinon.stub(salesService, 'getAll').resolves(getAllSalesFromService);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAll(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAllSalesFromService.data);
  });

  it('should return a product by id if productId exist', async function () {
    sinon.stub(salesService, 'getById').resolves(getSaleByIdFromService);

    const id = 3;

    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSaleByIdFromService.data);
  });

  it('should return 404 status and message `Product not found` if productId not exist', async function () {
    sinon.stub(salesService, 'getById').resolves(saleInvalidFromService);

    const id = 999;

    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('should return an object with `status` 201 and `data` after created a new sale', async function () {
    sinon.stub(salesService, 'create').resolves(saleCreatedFromService);

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
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.create(reqBody, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleCreatedFromService.data);
  });

  // it('should return an object with `id` and `name` after update an existing product', async function () {
  //   sinon.stub(productsService, 'update').resolves(productUpdatedFromService);

  //   const id = 3;
  //   const name = { name: 'Laço da Verdade' };

  //   const req = { params: { id }, body: name };
  //   const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

  //   await productsController.update(req, res);

  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(productUpdatedFromService.data);
  // });

  afterEach(function () {
    sinon.restore();
  });
});