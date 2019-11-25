const Neo4j = require('./neo4j.controller');

module.exports = (router) => {
  /* Neo4j*/
  router.post('/migrate', Neo4j.migrateData);
  router.get('/getUsersSales/:id_user', Neo4j.getUsersSales);
  router.get('/getStoresWithSales/', Neo4j.getStoresWithSales);
  router.get('/getTopFive/', Neo4j.getTopFive);
}
