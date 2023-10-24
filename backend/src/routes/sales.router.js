const salesRouter = require('express').Router();

const salesController = require('../controllers/sales.controller');
const { validateSales } = require('../middlewares');

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post(
  '/',
  validateSales.validateProductId,
  validateSales.validateQuantity,
  validateSales.checkIfProductIdExists,
  salesController.create,
);

// salesRouter.put('/:id', salesController.update);
// salesRouter.delete('/:id', salesController.exclude);

module.exports = salesRouter;