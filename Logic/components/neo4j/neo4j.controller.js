const neo4j = require('neo4j-driver').v1;
const Store = require('../store/store.dao');
const User = require('../auth/auth.dao');
const Sale = require('../sales/sales.dao');

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'pato123')
)

exports.migrateData = (req, res, next) => {
    /* Neo4j*/
    Store.find((err, resp) => {
        if (err) return res.status(500).send(err);
        if (!resp) {
            res.send({
                message: 'Id Store does not exists'
            });
        } else {
            var session = driver.session()
            var query = 'CREATE '
            for (let i = 0; i < resp.length; i++) {
                query = query + `(store${i.toString()}:Store{name:'${resp[i]['name']}', id_store:'${resp[i]['id_store']}', description:'${resp[i]['description']}', address:'${resp[i]['address']}'})`
                if (i != resp.length - 1) {
                    query = query + ", "
                }
            }
            session.run(query).subscribe({
                onNext: function (record) {
                    console.log('test')
                },
                onCompleted: function (data) {
                    console.log(data)
                    session.close()
                    migrateDataAux(res)
                },
                onError: function (error) {
                    console.log(error)
                    res.send(error)
                }
            })
        }
    });
}

function migrateDataAux(res) {
    User.find({ id_rol: 3 }, (err, resp) => {
        if (err) return res.status(500).send(err);
        if (!resp) {
            res.send({
                message: 'Clients empty'
            });
        } else {
            console.log(resp)
            var session = driver.session()
            var query = 'CREATE '
            for (let i = 0; i < resp.length; i++) {
                query = query + `(user${i.toString()}:Client{name:'${resp[i]['name']}', user_id:'${resp[i]['user_id']}', username:'${resp[i]['username']}', email:'${resp[i]['email']}'})`
                if (i != resp.length - 1) {
                    query = query + ", "
                }
            }
            session.run(query).subscribe({
                onNext: function (record) {
                },
                onCompleted: function (data) {
                    session.close()
                    migrateDataAux2(res)
                },
                onError: function (error) {
                    console.log(error)
                    res.send(error)
                }
            })
        }
    });
}

function migrateDataAux2(res) {
    Sale.find((err, resp) => {
        if (err) return res.status(500).send(err);
        if (!resp) {
            res.send({
                message: 'Sales empty'
            });
        } else {
            console.log(resp)
            var session = driver.session()
            for (let i = 0; i < resp.length; i++) {
                query = `CREATE (sale:Sale{id_sale:'${resp[i]['id_sale']}', id_store:'${resp[i]['id_store']}', id_user:'${resp[i]['id_user']}', datetime:'${resp[i]['datetime']}'}) \n
                WITH sale \n
                MATCH (p:Client), (s:Store) \n
                WHERE p.user_id='${resp[i]['id_user']}' AND s.id_store='${resp[i]['id_store']}' AND sale.id_sale='${resp[i]['id_sale']}' \n
                CREATE (sale)<-[r:BOUGHT_BY]-(p) \n
                CREATE (sale)<-[r1:BOUGHT_IN]-(s)`
                session.run(query).subscribe({
                    onNext: function (record) {
                    },
                    onCompleted: function (data) {
                    },
                    onError: function (error) {
                        console.log(error)
                        res.send(error)
                    }
                })
            }
            session.close()
            res.send("SUCCESS")
        }
    });
}

//***************** REPORTS **********************//
exports.getUsersSales = (req, res, next) => {
    var session = driver.session()
    let query = `MATCH (a:Sale{id_user:'${req.params.id_user}'})
    RETURN a.id_sale, a.id_store, a.datetime`
    let fData = []
    session.run(query)
        .then(function (result) {
            res.send(result['records'])
            session.close();
        })
        .catch(function (error) {
            console.log(error);
        });
}

exports.getStoresWithSales = (req, res, next) => {
    var session = driver.session()
    // let query =`MATCH friendships=(Store)<-[:BOUGHT_IN]-(Client)
    // RETURN friendships`
    let query = `match (n:Store)-[:BOUGHT_IN]->(Sale) return distinct n.id_store`
    session.run(query)
        .then(function (result) {
            res.send(result['records'])
            session.close();
        })
        .catch(function (error) {
            console.log(error);
        });
}

exports.getTopFive = (req, res, next) => {
    var session = driver.session()
    // let query =`MATCH friendships=(Store)<-[:BOUGHT_IN]-(Client)
    // RETURN friendships`
    let query = `match (n:Store) return n.id_store`
    let ress = [];
    session.run(query)
        .then(function (result) {
            //res.send(result['records'])
            session.close();
            ress = result['records'];
            var session1 = driver.session()
            let results = []
            for (let i = 0; i < ress.length; i++) {
                session1.run(`MATCH (n:Store)-[r:BOUGHT_IN]->() WHERE n.id_store = '${ress[i]["_fields"][0]}' RETURN COUNT(r) as Count, n.id_store`)
                    .then(function (result) {
                        let data = {
                            id_store: ress[i]["_fields"][0],
                            quantity: result['records'][0]['_fields'][0]['low']
                        }
                        results.push(data)
                        if (i == ress.length - 1) {
                            res.send(results)
                        }
                        console.log(results)
                    }
                    )
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}