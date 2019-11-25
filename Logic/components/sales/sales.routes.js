const Sales = require('./sales.controller');

module.exports = (router) => {
  /* Auth  Users*/
  router.post('/sales', Sales.createSale);
  router.delete('/sales/:id_sale', Sales.deleteSale);
  router.get('/sales/:id_sale', Sales.readSale);
  router.get('/sales', Sales.readSaleAll);
  router.get('/salesbyUser/:id_user', Sales.readSaleUser);
}