const { productIdExistsInDB } = require('../models/sales.model');

const validateProductId = (req, res, next) => {
  const arrayWithProducts = req.body;

  for (let i = 0; i < arrayWithProducts.length; i += 1) {
    const product = arrayWithProducts[i];

    if (!product.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const arrayWithProducts = req.body;

  const MIN_QUANTITY = 1;

  for (let i = 0; i < arrayWithProducts.length; i += 1) {
    const product = arrayWithProducts[i];

    if (product.quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }

    if (product.quantity < MIN_QUANTITY) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }

  next();
};

const checkIfProductIdExists = async (req, res, next) => {
  const arrayWithProducts = req.body;

  const productIdExistsPromises = [];

  arrayWithProducts.forEach((product) => {
    const productIdExists = productIdExistsInDB(product.productId);
    productIdExistsPromises.push(productIdExists);
  });

  const productIdExistsResults = await Promise.all(productIdExistsPromises);

  for (let i = 0; i < productIdExistsResults.length; i += 1) {
    if (!productIdExistsResults[i]) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }

  next();
};

module.exports = {
  validateProductId,
  validateQuantity,
  checkIfProductIdExists,
};