const Store = require('./store.dao');

exports.createStore = (req, res, next) => {
  const newStore = {
    id_store: req.body.id_store,
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    lat: req.body.lat,
    long: req.body.long
  }

  Store.create(newStore, (err, user) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id already exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      id_store: user.id_store
    }
    res.send({
      jsonResponse
    });
  });
}

/* Read Admin User */
exports.readStore = (req, res, next) => {
  const storeData = {
    id_store: req.params.id_store
  }
  Store.findOne({
    id_store: storeData.id_store
  }, (err, resp) => {
    if (err) return res.status(500).send(err);
    if (!resp) {
      res.send({
        message: 'Id Store does not exists'
      });
    } else {
      const jsonResponse = {
        name: resp.name,
        description: resp.description,
        id_store: resp.id_store,
        address: resp.address,
        lat: resp.lat,
        long: resp.long
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.deleteStore = (req, res) => {
  const deleteStore = {
    id_store: req.params.id_store
  }
  Store.findOneAndDelete(deleteStore, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id Store does not exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      m_delete: 'Store deleted'
    }
    res.send({
      jsonResponse
    });
  });
}