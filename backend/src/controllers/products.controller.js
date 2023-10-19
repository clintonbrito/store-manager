const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products.data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.status) {
    return res.status(404).json(product.data);
  }
  return res.status(200).json(product.data);
};

const create = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.create(name);
  if (product.status) {
    return res.status(422).json(product.data);
  }
  return res.status(201).json(product.data);
};

module.exports = {
  getAll,
  getById,
  create,
};