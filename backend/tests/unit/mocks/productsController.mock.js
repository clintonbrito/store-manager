const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const product = {
  id: 3,
  name: 'Escudo do Capitão América',
};

const productCreated = {
  id: 4,
  name: 'Laço da Verdade',
};

const productUpdated = {
  id: 3,
  name: 'Laço da Verdade',
};

const getAllProductsFromService = {
  status: 200,
  data: products,
};

const getProductByIdFromService = {
  status: 200,
  data: product,
};

const productInvalidFromService = {
  status: 404,
  message: 'Product not found',
};

const productCreatedFromService = {
  status: 201,
  data: productCreated,
};

// const productInvalidCreatedFromService = {
//   status: 201,
//   data: productCreated,
// };

const productUpdatedFromService = {
  status: 200,
  data: productUpdated,
};

module.exports = {
  getAllProductsFromService,
  getProductByIdFromService,
  productInvalidFromService,
  productCreatedFromService,
  productUpdatedFromService,
};