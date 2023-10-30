const salesService = require('../services/sales.service');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  // console.log(sales);
  return res.status(200).json(sales.data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  // console.log(sale.data);

  if (sale.message) {
    return res.status(sale.status).json({ message: sale.message });
  }

  return res.status(sale.status).json(sale.data);
};

const create = async (req, res) => {
  const arrayWithProducts = req.body;
  const sale = await salesService.create(arrayWithProducts);
  // console.log(sale);

  return res.status(sale.status).json(sale.data);
};

module.exports = {
  getAll,
  getById,
  create,
};