const Airport = require('./airport.dao');

/* Create Airport */
exports.createAirport = (req, res, next) => {
  const newAirport = {
    id_airport: req.body.id_airport,
    name: req.body.name,
    country: req.body.country,
    info_contact: req.body.info_contact,
    url_website: req.body.url_website
  }
  Airport.create(newAirport, (err, resp) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id Airport already exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_create: 'Airport created'
    }
    res.send({
      jsonResponse
    });
  });
}


/* Read Airport */
exports.readAirport = (req, res, next) => {
  const userData = {
    id_airport: req.params.id_airport
  }
  Airport.findOne({
    id_airport: userData.id_airport
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id Airport does not exists'
      });
    } else {
      const jsonResponse = {
        name: resp.name,
        country: resp.country,
        info_contact: resp.info_contact,
        url_website: resp.url_website
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Update Airport */
exports.updateAirport = (req, res) => {
  const currentAirport = {
    id_airport: req.params.id_airport,  /* body >< params  */
  }
  const updateAirport = {
    id_airport: req.params.id_airport,  /* body >< params  */
    name: req.body.name,
    country: req.body.country,
    info_contact: req.body.info_contact,
    url_website: req.body.url_website
  }

  Airport.findOneAndUpdate(currentAirport, updateAirport, (err, resp) => {
    
    if (!err && !resp) return res.send({
      message: 'Id Airport does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_update: 'Airport updated'
    }
    res.send({
      jsonResponse
    });
  });
}

exports.deleteAirport = (req, res) => {
  const newAirport = {
    id_airport: req.params.id_airport
  }
  Airport.findOneAndDelete(newAirport, (err, resp) => {
    if (err==null && resp==null) return res.send({
      message: 'Id Airport does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_delete: 'Airport deleted'
    }
    res.send({
      jsonResponse
    });
  });
}


exports.getIdsAirports = (req, res, next) => {
  Airport.find({}, { id_airport: 1, _id: 0 }, (err, resp) => {   
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      res.send({
        resp
      });
    }
  });
}

exports.getNameAirports = (req, res, next) => {
  Airport.find({}, { name: 1, _id: 0 }, (err, resp) => {   
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      res.send({
        resp
      });
    }
  });
}