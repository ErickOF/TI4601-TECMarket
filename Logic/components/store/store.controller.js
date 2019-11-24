const Store = require('./store.dao');

exports.createStore = (req, res, next) => {
  const newStore = {
    id_store: req.body.id_store,
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    lat: req.body.lat,
    long: req.body.long,
    img: req.body.img,
    phone: req.body.phone,
    rating: req.body.rating,
    schedule: req.body.schedule,
    website: req.body.website,
    products: req.body.products
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
      res.send({
        data: resp
      });
    }
  });
}

/* Read Admin User */
exports.readStoreAll = (req, res, next) => {
  Store.find((err, resp) => {
    if (err) return res.status(500).send(err);
    if (!resp) {
      res.send({
        message: 'Id Store does not exists'
      });
    } else {
      res.send({
        data: resp
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

exports.addProduct = (req, res) => {
  const newproduct = {
    product_code: req.body.product_code,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    photo: req.body.photo
  }
  const newStore = {
    id_store: req.param.id_store
  }
  Store.findOneAndUpdate(
    { id_store: req.params.id_store },
    { $push: { products: newproduct } },
    (err, resp) => {
      if (err == null && resp == null) return res.send({
        message: 'Id Store does not exists'
      });
      if (err) return res.status(500).send(err);
      const jsonResponse = {
        m_delete: 'Product added'
      }
      res.send({
        jsonResponse
      });
    }
  );
}

exports.deleteProduct = (req, res) => {
  Store.findOneAndUpdate(
    { id_store: req.params.id_store },
    { $pull: { products: {product_code: req.body.product_code} } },
    (err, resp) => {
      if (err == null && resp == null) return res.send({
        message: 'Id Store does not exists'
      });
      if (err) return res.status(500).send(err);
      const jsonResponse = {
        m_delete: 'Product deleted'
      }
      res.send({
        jsonResponse
      });
    }
  );
}