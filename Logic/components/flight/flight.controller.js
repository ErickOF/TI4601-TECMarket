const Flight = require('./flight.dao');

exports.createFlight = (req, res, next) => {
  const newFlight = {
    id_flight: req.body.id_flight,
    id_airline: req.body.id_airline,
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival,
    name: req.body.name,
    origin: req.body.origin,
    destination: req.body.destination,
    itinerary: req.body.itinerary,
    price: req.body.price,
    restrictions: req.body.restrictions,
    features: req.body.features,
    status: req.body.status,
    max_capacity: req.body.max_capacity,
  }
  Flight.create(newFlight, (err, resp) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id Flight already exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      id_flight: resp.id_flight,
      id_airline: resp.id_airline,
      date_departure: resp.date_departure,
      date_arrival: resp.date_arrival,
      name: resp.name,
      origin: resp.origin,
      destination: resp.destination,
      itinerary: resp.itinerary,
      price: resp.price,
      restrictions: resp.restrictions,
      features: resp.features,
      status: resp.status,
      max_capacity: resp.max_capacity
    }
    res.send({
      jsonResponse
    });
  });
}


exports.readFlight = (req, res, next) => {
  const userData = {
    id_flight: req.params.id_flight
  }
  Flight.findOne({
    id_flight: userData.id_flight
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        id_airline: resp.id_airline,
        date_departure: resp.date_departure,
        date_arrival: resp.date_arrival,
        name: resp.name,
        origin: resp.origin,
        destination: resp.destination,
        itinerary: resp.itinerary,
        price: resp.price,
        restrictions: resp.restrictions,
        features: resp.features,
        status: resp.status,
        max_capacity: resp.max_capacity
      }
      res.send({
        jsonResponse
      });
    }
  });
}



/* Update Flight */
exports.updateFlight = (req, res) => {
  const currentFlight = {
    id_flight: req.params.id_flight,
    /* body >< params  */
  }
  const updateFlight = {
    id_flight: req.params.id_flight,
    /* body >< params  */
    id_airline: req.body.id_airline,
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival,
    name: req.body.name,
    origin: req.body.origin,
    destination: req.body.destination,
    itinerary: req.body.itinerary,
    price: req.body.price,
    restrictions: req.body.restrictions,
    features: req.body.features,
    status: req.body.status,
    max_capacity: req.body.max_capacity,
  }

  Flight.findOneAndUpdate(currentFlight, updateFlight, (err, resp) => {

    if (!err && !resp) return res.send({
      message: 'Id Flight does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_update: 'Flight updated'
    }
    res.send({
      jsonResponse
    });
  });
}

exports.deleteFlight = (req, res) => {
  const newFlight = {
    id_flight: req.params.id_flight
  }
  Flight.findOneAndDelete(newFlight, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id Flight does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_delete: 'Flight deleted'
    }
    res.send({
      jsonResponse
    });
  });
}


exports.getIdsFlights = (req, res, next) => {
  Flight.find({}, {
    id_flight: 1,
    _id: 0
  }, (err, resp) => {
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


exports.getFlight_to_BuyTickecks = (req, res, next) => {
  const buyTickets = {
    origin: req.body.origin,
    destination: req.body.destination,
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival
  }
  Flight.find({
    origin: buyTickets.origin,
    destination: buyTickets.destination,
    date_departure: {
      $gte: new Date(buyTickets.date_departure)
    },
    date_arrival: {
      $lte: new Date(buyTickets.date_arrival)
    },
    status: {
      $ne: 'Canceled'
    }
  }, { /* Exclusiones del json */
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    max_capacity: 0,
    itinerary: 0,
    id_airline: 0
  }, (err, resp) => {

    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });
        
      } else {
        res.send({
          resp
        });
      }
    }
  });
}



/* Report */
/* Range Dates */
exports.getFlight_R1_dates = (req, res, next) => {
  const buyTickets = {
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival
  }
  Flight.find({
    date_departure: {
      $gte: new Date(buyTickets.date_departure)
    },
    date_arrival: {
      $lte: new Date(buyTickets.date_arrival)
    }
  }, { /* Exclusiones del json */
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
  }, (err, resp) => {

    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });        
      } else {
        res.send({
          resp
        });
      }
    }
  });
}
/* Status */
exports.getFlight_R1_status = (req, res, next) => {
  const buyTickets = {
    status: req.body.status
  }
  Flight.find({
    status: buyTickets.status
  }, { /* Exclusiones del json */
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
  }, (err, resp) => {

    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });        
      } else {
        res.send({
          resp
        });
      }
    }
  });
}



/* Name Passenger */
exports.getFlight_R1_name = (req, res, next) => {
  const flightsData = {
    id_flight: req.body.id_flight
  }
  Flight.find({
    id_flight:  {$in: flightsData.id_flight}
  }, (err, resp) => {

    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });        
      } else {
        res.send({
          resp
        });
      }
    }
  });
}




/* Report 2 */
/* Range Dates */
exports.getFlight_R2_dates = (req, res, next) => {
  const flightsData = {
    date_departure: req.body.date_departure,
    date_arrival: req.body.date_arrival,
    id_flight: req.body.id_flight,
  }
  Flight.find({
    date_departure: {
      $gte: new Date(flightsData.date_departure)
    },
    date_arrival: {
      $lte: new Date(flightsData.date_arrival)
    },
    id_flight:  {$in: flightsData.id_flight}
  }, { /* Exclusiones del json */
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
  }, (err, resp) => {

    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });        
      } else {
        res.send({
          resp
        });
      }
    }
  });
}
/* Status */
exports.getFlight_R2_status = (req, res, next) => {
  const flightsData = {
    status: req.body.status,
    id_flight: req.body.id_flight,
  }
  Flight.find({
    status: flightsData.status,
    id_flight:  {$in: flightsData.id_flight}
  }, { /* Exclusiones del json */
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
  }, (err, resp) => {

    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });        
      } else {
        res.send({
          resp
        });
      }
    }
  });
}