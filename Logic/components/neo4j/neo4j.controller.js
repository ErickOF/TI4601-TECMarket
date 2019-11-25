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
                    //console.log('test')
                },
                onCompleted: function (data) {
                    //console.log(data)
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
            //console.log(resp)
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
            //console.log(resp)
            var session = driver.session()
            for (let i = 0; i < resp.length; i++) {
                query = `CREATE (sale:Sale{id_sale:'${resp[i]['id_sale']}', id_store:'${resp[i]['id_store']}', id_user:'${resp[i]['id_user']}', datetime:'${resp[i]['datetime']}'}) \n
                WITH sale \n
                MATCH (p:Client), (s:Store) \n
                WHERE p.user_id='${resp[i]['id_user']}' AND s.id_store='${resp[i]['id_store']}' AND sale.id_sale='${resp[i]['id_sale']}' \n
                CREATE (sale)-[r:BOUGHT_BY]->(p) \n
                CREATE (sale)-[r1:BOUGHT_IN]->(s)`
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
    let ress = []
    session.run(query).subscribe({
        onNext: function (record) {
            var d={
                id_sale:record['_fields'][0],
                store:record['_fields'][1],
                date:record['_fields'][2]
            }
            ress.push(d);
        },
        onCompleted: function (data) {
            session.close()
            res.send(ress)
        },
        onError: function (error) {
            console.log(error)
            res.send(error)
        }
    })
}

exports.getStoresWithSales = (req, res, next) => {
    var session = driver.session()
    let query = `match (n:Store)<-[:BOUGHT_IN]-(Sale) return distinct n.id_store`
    let ress=[];
    session.run(query).subscribe({
        onNext: function (record) {
            ress.push(record['_fields'][0]);
        },
        onCompleted: function (data) {
            session.close()
            res.send(ress)
        },
        onError: function (error) {
            console.log(error)
            res.send(error)
        }
    })
}

exports.getTopFive = (req, res, next) => {
    var session = driver.session()
    let query = `MATCH (s:Sale)-[:BOUGHT_IN]->(st:Store)
    RETURN st.name as store, size(collect(s.id_sale)) AS sales`
    let ress = [];
    session.run(query).subscribe({
        onNext: function (record) {
            var d={
                store:record['_fields'][0],
                sales:record['_fields'][1]['low']
            }
            ress.push(d);
        },
        onCompleted: function (data) {
            session.close()
            res.send(ress)
        },
        onError: function (error) {
            console.log(error)
            res.send(error)
        }
    })
}

exports.getSimilarPeople = (req, res, next) => {
    var session = driver.session()
    let query = `MATCH (p:Client)<-[r:BOUGHT_BY]-(:Sale)-[:BOUGHT_IN]->(place:Store)
    WHERE exists((place)<-[:BOUGHT_IN]-(:Sale)-[:BOUGHT_BY]->(:Client{user_id:'${req.params.id_user}'}))
    RETURN distinct p.name, p.user_id`
    let ress = [];
    session.run(query).subscribe({
        onNext: function (record) {
            let d={
                name:record['_fields'][0],
                user_id:record['_fields'][1]
            }
            ress.push(d);
        },
        onCompleted: function (data) {
            session.close()
            res.send(ress)
        },
        onError: function (error) {
            console.log(error)
            res.send(error)
        }
    })
}