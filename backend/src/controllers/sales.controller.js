const salesService = require('../services/sales.service');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales.data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (sale.status) {
    return res.status(404).json(sale.data);
  }
  return res.status(200).json(sale.data);
};

const create = async (req, res) => {
  const { productId, quantity } = req.body;
  const sale = await salesService.create(productId, quantity);
  if (sale.status) {
    return res.status(422).json(sale.data);
  }
  return res.status(201).json(sale.data);
};

module.exports = {
  getAll,
  getById,
  create,
};