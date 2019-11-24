const Product = require('./product.dao');

exports.createProduct = (req, res, next) => {
  const newproduct = {
    product_code: req.body.product_code,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    photo: req.body.photo
  }

  Product.create(newproduct, (err, user) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id already exists'
    });
    if (err) return res.status(500).send(err);
    res.send({
      message: 'product added'

    });
  });
}

/* Read Admin User */
exports.readProduct = (req, res, next) => {
  const userData = {
    product_code: req.params.product_code
  }
  Product.findOne({
    product_code: userData.product_code
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id product does not exists'
      });
    } else {
      res.send({
        resp
      });
    }
  });
}

exports.deleteProduct = (req, res) => {
  const deleteUser = {
    product_code: req.params.product_code
  }
  Product.findOneAndDelete(deleteUser, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id Product does not exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      m_delete: 'Product deleted'
    }
    res.send({
      jsonResponse
    });
  });
}