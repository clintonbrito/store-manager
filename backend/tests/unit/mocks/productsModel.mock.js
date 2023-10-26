const getAllProductsFromDB = [[
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
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
]];

const getProductByIdFromDB = [[{
  id: 2,
  name: 'Traje de encolhimento',
}]];

const getProductByIdFromModel = {
  id: 2,
  name: 'Traje de encolhimento',
};

const productsByIdNotFoundMock = {
  status: 'HTTP_NOT_FOUND',
  data: { message: 'Product not found' },
};

const productCreatedFromDB = [
  {
    insertId: 4,
  },
];

module.exports = {
  getAllProductsFromDB,
  getProductByIdFromDB,
  productsByIdNotFoundMock,
  productCreatedFromDB,
  getProductByIdFromModel,
};