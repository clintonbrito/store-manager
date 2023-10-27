const productsModel = require('../models/products.model');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { status: 200, data: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  // console.log(product);
  if (!product) {
    return {
      status: 404,
      message: 'Product not found',
    };
  }
  return { status: 200, data: product };
};

const create = async (name) => {
  const product = await productsModel.create(name);
  // console.log(product);

  return { status: 201, data: product };
};

const update = async (name, id) => {
  const product = await productsModel.update(name, id);
  console.log(product);

  return { status: 200, data: product };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};