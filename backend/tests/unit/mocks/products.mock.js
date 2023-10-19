const productsMock = [
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
];

const productsByIdMock = {
  id: 2,
  name: 'Traje de encolhimento',
};

const productsByIdNotFoundMock = {
  status: 'HTTP_NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  productsMock,
  productsByIdMock,
  productsByIdNotFoundMock,
};