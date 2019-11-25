const Site = require('./site.controller');

module.exports = (router) => {
  /* Stores*/
  router.post('/site', Site.createSite);
  router.post('/addsite/:id_store', Site.addSite);
  router.delete('/site/:id_store', Site.deleteSite);
  router.delete('/deletesite/:id_store', Site.deleteSingleSite);
  router.get('/site/:id_store', Site.readSite);
}