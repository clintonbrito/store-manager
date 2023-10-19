const httpErrorMap = {
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  HTTP_DELETED: 204,
  HTTP_BAD_REQUEST: 400,
  HTTP_NOT_FOUND: 404,
  HTTP_CONFLICT: 409,
  HTTP_INVALID_VALUE: 422,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = mapStatusHTTP;