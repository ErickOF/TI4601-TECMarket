const Users = require('./product.controller');

module.exports = (router) => {
  /* Auth  Users*/
  router.post('/addProduct', Users.createProduct);
  router.delete('/deleteProduct/:product_code', Users.deleteProduct);
  router.get('/readProduct/:product_code', Users.readProduct);
}