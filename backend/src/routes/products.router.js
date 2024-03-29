const productsRouter = require('express').Router();

const productsController = require('../controllers/products.controller');
const { validateProducts } = require('../middlewares');

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', validateProducts.validateProducts, productsController.create);

productsRouter.put(
  '/:id',
  validateProducts.validateProducts,
  validateProducts.checkIfProductIdExists,
  productsController.update,
);

module.exports = productsRouter;