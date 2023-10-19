const productsRouter = require('express').Router();

const productsController = require('../controllers/products.controller');
const validateProducts = require('../middlewares/validateProducts');

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', validateProducts, productsController.create);

module.exports = productsRouter;