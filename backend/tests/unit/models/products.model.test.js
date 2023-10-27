const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const {
  getAllProductsFromDB,
  getProductByIdFromDB,
  productCreatedFromDB,
  productUpdatedFromDB,
} = require('../mocks/productsModel.mock');

describe('Test - Products Model:', function () {
  it('should return all products', async function () {
    sinon.stub(connection, 'execute').resolves(getAllProductsFromDB);

    const products = await productsModel.getAll();

    expect(products).to.be.an('array');
    expect(products[0]).to.be.an('object');
    expect(products[0].id).to.be.equal(1);
    expect(products[0].name).to.be.equal('Martelo de Thor');
    // expect(products).to.be.deep.equal(getAllProductsFromDB); // Isso é correto?
  });

  it('should return a product by id if productId exist', async function () {
    sinon.stub(connection, 'execute').resolves(getProductByIdFromDB);

    const productId = 2;
    const productsById = await productsModel.getById(productId);

    const expectedResult = {
      id: 2,
      name: 'Traje de encolhimento',
    };

    expect(productsById).to.be.deep.equal(expectedResult);
  });

  it('should return 404 status and message `Product not found` if productId not exist', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const productId = 9999;
    const productsById = await productsModel.getById(productId);

    expect(productsById).to.be.deep.equal(undefined);
  });

  it('should return an object with `id` and `name` after created a new product', async function () {
    sinon.stub(connection, 'execute').resolves(productCreatedFromDB);

    const productName = 'Pílulas de Nanicolina';
    const productCreated = await productsModel.create(productName);

    const expectedResult = {
      id: 4,
      name: productName,
    };

    expect(productCreated).to.be.deep.equal(expectedResult);
  });

  it('should return an object with `id` and `name` after update an existing product', async function () {
    sinon.stub(connection, 'execute').resolves(productUpdatedFromDB);

    const name = 'Pílulas de Nanicolina';
    const id = 3;

    const productUpdated = await productsModel.update(name, id);

    const expectedResult = {
      id: 3,
      name,
    };

    expect(productUpdated).to.be.deep.equal(expectedResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});