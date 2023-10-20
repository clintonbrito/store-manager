const productsModel = require('../models/products.model');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { status: null, data: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  // console.log(product);
  if (!product) {
    return {
      status: 'HTTP_NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
  return { status: null, data: product };
};

const create = async (name) => {
  const product = await productsModel.create(name);
  if (product.status) {
    return {
      status: 'HTTP_INVALID_VALUE',
      data: { message: product.data.message },
    };
  }
  return { status: null, data: product };
};

module.exports = {
  getAll,
  getById,
  create,
};