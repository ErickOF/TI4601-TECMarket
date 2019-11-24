const Neo4j = require('./neo4j.controller');

module.exports = (router) => {
  /* Neo4j*/
  router.post('/migrate', Neo4j.migrateData);
}
