const Store = require('./store.controller');

module.exports = (router) => {
  /* Stores*/
  router.post('/store', Store.createStore);
  router.post('/product/:id_store', Store.addProduct);
  router.delete('/product/:id_store', Store.deleteProduct);
  router.delete('/store/:id_store', Store.deleteStore);
  router.get('/store/:id_store', Store.readStore);
  router.get('/storeall', Store.readStoreAll);
}