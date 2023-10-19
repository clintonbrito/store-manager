const salesRouter = require('express').Router();

const salesController = require('../controllers/sales.controller');

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', salesController.create);

// salesRouter.put('/:id', salesController.update);
// salesRouter.delete('/:id', salesController.exclude);

module.exports = salesRouter;