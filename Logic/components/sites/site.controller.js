const Sites = require('./site.dao');

exports.createSite = (req, res, next) => {
  const newSite = {
    id_store: req.body.id_store,
    sites: req.body.sites
  }

  Sites.create(newSite, (err, user) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id already exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      message: 'site created'
    }
    res.send({
      jsonResponse
    });
  });
}

exports.readSite = (req, res, next) => {
  const siteData = {
    id_store: req.params.id_store
  }
  Sites.findOne({
    id_store: siteData.id_store
  }, (err, resp) => {
    if (err) return res.status(500).send(err);
    if (!resp) {
      res.send({
        message: 'Id Site does not exists'
      });
    } else {
      res.send({
        data: resp
      });
    }
  });
}

exports.deleteSite = (req, res) => {
  const deleteSite = {
    id_site: req.params.id_site
  }
  Sites.findOneAndDelete(deleteSite, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id Site does not exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      m_delete: 'Site deleted'
    }
    res.send({
      jsonResponse
    });
  });
}

exports.addSite = (req, res) => {
  const newproduct = {
    img: req.body.img,
    idSite: req.body.idSite,
    phone: req.body.phone,
    rating: req.body.rating,
    schedule: req.body.schedule,
    website: req.body.website,
    distance: req.body.distance
  }
  const newSite = {
    id_store: req.param.id_store
  }
  Sites.findOneAndUpdate(
    { id_store: req.params.id_store },
    { $push: { sites: newproduct } },
    (err, resp) => {
      if (err == null && resp == null) return res.send({
        message: 'Id Site does not exists'
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

exports.deleteSingleSite = (req, res) => {
  Sites.findOneAndUpdate(
    { id_store: req.params.id_store },
    { $pull: { sites: {idSite: req.body.idSite} } },
    (err, resp) => {
      if (err == null && resp == null) return res.send({
        message: 'Id Site does not exists'
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