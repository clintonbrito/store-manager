const { productIdExistsInDB } = require('../models/products.model');

const validateProducts = (req, res, next) => {
  const { name } = req.body;
  const MIN_NAME_LENGTH = 5;
  
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < MIN_NAME_LENGTH) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const checkIfProductIdExists = async (req, res, next) => {
  const { id } = req.params;

  const productIdExists = await productIdExistsInDB(id);

  if (!productIdExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateProducts,
  checkIfProductIdExists,
};