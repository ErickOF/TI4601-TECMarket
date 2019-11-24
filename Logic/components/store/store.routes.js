const Store = require('./store.controller');

module.exports = (router) => {
  /* Stores*/
  router.post('/store', Store.createStore);
  router.delete('/store/:id_store', Store.deleteStore);
  router.get('/store/:id_store', Store.readStore);
}