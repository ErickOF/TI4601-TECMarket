const neo4j = require('neo4j-driver').v1;
const Store = require('../store/store.dao');

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'pato123')
  )

exports.migrateData = (req, res, next)=> {
  /* Neo4j*/
  Store.find((err, resp) => {
    if (err) return res.status(500).send(err);
    if (!resp) {
      res.send({
        message: 'Id Store does not exists'
      });
    } else {
        var session = driver.session()
        for(let i=0; i<resp.length; i++){
            // console.log(`TEST:${resp[i]['address']}`)
            session.run(`CREATE (store:Store{name:'${resp[i]['name']}', id_store:'${resp[i]['id_store']}', description:'${resp[i]['description']}', address:'${resp[i]['address']}'})`)
            .then(function(result) {
                migrateDataAux()
            })
          .catch(function(error) {
            console.log("ERROR")
            res.send(error)
        })
        }
    }
  });
  console.log("PRUEBA DE FLUJO");
}

function migrateDataAux(){
    
}   