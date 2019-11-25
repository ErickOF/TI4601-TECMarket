const Sales = require('./sales.dao');

exports.createSale = (req, res, next) => {
  const newsale = {
    id_sale: req.body.id_sale,
    id_store: req.body.id_store,
    id_user: req.body.id_user,
    datetime: req.body.datetime,
    state: req.body.state,
    need: req.body.need,
    products: req.body.products
  }

  Sales.create(newsale, (err, resp) => {
    if (err && err.code === 11000) return res.send({
      err
    });
    if (err) return res.status(500).send(err);
    res.send({
      message: 'sale added'

    });
  });
}

/* Read Admin User */
exports.readSale = (req, res, next) => {
  const userData = {
    id_sale: req.params.id_sale
  }
  Sales.findOne({
    id_sale: userData.id_sale
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id sale does not exists'
      });
    } else {
      res.send({
        resp
      });
    }
  });
}

/* Read Admin User */
exports.readSaleUser = (req, res, next) => {
  const userData = {
    id_user: req.params.id_user
  }
  Sales.find({
    id_user: userData.id_user
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id sale does not exists'
      });
    } else {
      res.send({
        resp
      });
    }
  });
}

/* Read Admin User */
exports.readSaleAll = (req, res, next) => {
  Sales.find((err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id sale does not exists'
      });
    } else {
      res.send({
        resp
      });
    }
  });
}

exports.deleteSale = (req, res) => {
  const deleteUser = {
    id_sale: req.params.id_sale
  }
  Sales.findOneAndDelete(deleteUser, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id Sale does not exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      m_delete: 'Sale deleted'
    }
    res.send({
      jsonResponse
    });
  });
}