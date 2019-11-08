const Sale = require('./sale.dao');


/* Create sale */
exports.createSale = (req, res, next) => {
  const newSale = {
    id_user: req.body.id_user,
    id_flight: req.body.id_flight,
    origin: req.body.origin,
    destination: req.body.destination,
    date_departure: req.body.date_departure,

    date_arrival: req.body.date_arrival,
    tickets: req.body.tickets,
    suitcases: req.body.suitcases,
    observation: req.body.observation,
    status: req.body.status,
    seat: req.body.seat

  }

  Sale.create(newSale, (err, resp) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id Sale already exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      _id: resp._id,
      id_user: resp.id_user,
      id_flight: resp.id_flight,
      origin: resp.origin,
      destination: resp.destination,
      date_departure: resp.date_departure,
      date_arrival: resp.date_arrival,
      tickets: resp.tickets,
      suitcases: resp.suitcases,
      observation: resp.observation,
      status: resp.status,
      seat: resp.seat
    }
    res.send({
      jsonResponse
    });
  });
}

/* Read Sale */
exports.readSale = (req, res, next) => {
  const saleData = {
    _id: req.params._id,
    id_user: req.params.id_user,
    id_flight: req.params.id_flight,
  }
  Sale.findOne({
    _id: saleData._id,
    id_user: saleData.id_user,
    id_flight: saleData.id_flight,
  }, {
    createdAt: 0,
    updatedAt: 0,
    __v: 0
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong; Check your email'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Verify Sale */
exports.verifySale = (req, res, next) => {
  const saleData = {
    _id: req.params._id,
    id_user: req.params.id_user
  }
  Sale.findOne({
    _id: saleData._id,
    id_user: saleData.id_user
  }, {
    createdAt: 0,
    updatedAt: 0,
    origin: 0,
    destination: 0,
    date_departure: 0,
    date_arrival: 0,
    tickets: 0,
    suitcases: 0,
    __v: 0
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong; Check your email'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Update Sale */
exports.updateSale = (req, res) => {
  const currentSale = {
    _id: req.params._id,
  }
  const updateSale = {
    id_user: req.body.id_user,
    id_flight: req.body.id_flight,
    origin: req.body.origin,
    destination: req.body.destination,
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival,
    tickets: req.body.tickets,
    suitcases: req.body.suitcases,
    observation: req.body.observation,
    status: req.params.status,
    /* Checked or Canceled */
    seat: 1
  }

  Sale.findOneAndUpdate(currentSale, updateSale, (err, resp) => {
    if (!err && !resp) return res.send({
      message: 'Id Sale does not exists'
    });
    if (err) return res.status(500).send({
      message: 'Something is wrong'
    });
    const jsonResponse = {
      m_update: 'Sale updated'
    }
    res.send({
      jsonResponse
    });
  });
}

/* Get the IdFlights by IdUser */
exports.getIdFlightsIdUser = (req, res, next) => {
  const jsonData = {
    id_user: req.params.id_user
  }
  Sale.find({
    id_user: jsonData.id_user
  }, {
    _id: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
    seat: 0,
    status: 0,
    suitcases: 0,
    observation: 0,
    date_arrival: 0,
    date_departure: 0,
    destination: 0,
    origin: 0
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.getTopDestination = (req, res, next) => {
  Sale.aggregate([{
    "$group": {
      "_id": {
        "destination": "$destination",
      },
      "count": {
        "$sum": 1
      }
    }
  }], (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}
/* REPORT */
/* Operations ID_USER*/
exports.getRA_Oper_IdUser = (req, res, next) => {
  const saleData = {
    id_user: req.body.id_user,
  }
  Sale.countDocuments({
    id_user: saleData.id_user,
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong; Check your email'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Operation DATES*/
exports.getRA_Oper_Dates = (req, res, next) => {
  const saleData = {
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival,
  }
  Sale.countDocuments({
    date_departure: {
      $gte: new Date(saleData.date_departure)
    },
    date_arrival: {
      $lte: new Date(saleData.date_arrival)
    }
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong; Check your email'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Operation Status*/
exports.getRA_Oper_Status = (req, res, next) => {
  const saleData = {
    status: req.body.status,
  }
  Sale.countDocuments({
    status: saleData.status,
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong; Check your email'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  });
}



/* 3 best passenger*/


exports.getRA_3Best = (req, res, next) => {
  Sale.find({}, {
    id_user: 1,
    _id: 0
  }, (err, resp) => {
    if (!resp || err) {
      res.send({
        message: 'Something is wrong; Check your email'
      });
    } else {
      const jsonResponse = {
        resp
      }
      res.send({
        jsonResponse
      });
    }
  }).sort({id_user: 1});
}