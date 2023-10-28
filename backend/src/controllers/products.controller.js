const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const { status, data } = await productsService.getAll(); // descontruí para acessar diretamente as propriedades do objeto que retorna a camada service.
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.message) {
    return res.status(product.status).json({ message: product.message });
  }
  return res.status(product.status).json(product.data);
};

const create = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.create(name);

  if (product.message) {
    return res.status(product.status).json({ message: product.message });
  }

  return res.status(product.status).json(product.data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const product = await productsService.update(name, id);

  if (product.message) {
    return res.status(product.status).json({ message: product.message });
  }

  return res.status(product.status).json(product.data);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};