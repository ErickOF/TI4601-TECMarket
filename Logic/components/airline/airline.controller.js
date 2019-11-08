const Airline = require('./airline.dao');

exports.createAirline = (req, res, next) => {
  const newAirline = {
    id_airline: req.body.id_airline,
    name_airport: req.body.name_airport,
    name_airline: req.body.name_airline,
    country: req.body.country
  }
  Airline.create(newAirline, (err, resp) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id Airline already exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      id_airline: resp.id_airline,
      name_airport: resp.name_airport,
      name_airline: resp.name_airline,
      country: resp.country
    }
    res.send({
      jsonResponse
    });
  });
}


exports.readAirline = (req, res, next) => {
  const userData = {
    id_airline: req.params.id_airline
  }
  Airline.findOne({
    id_airline: userData.id_airline
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        id_airline: resp.id_airline,
        name_airport: resp.name_airport,
        name_airline: resp.name_airline,
        country: resp.country
      }
      res.send({
        jsonResponse
      });
    }
  });
}


/* Update Airline */
exports.updateAirline = (req, res) => {
  const currentAirline = {
    id_airline: req.params.id_airline
  }
  const updateAirline = {
    id_airline: req.params.id_airline,
    name_airport: req.body.name_airport,
    name_airline: req.body.name_airline,
    country: req.body.country
  }
  Airline.findOneAndUpdate(currentAirline, updateAirline, (err, resp) => {
    if (!err && !resp) return res.send({
      message: 'Id Airline does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_update: 'Airline updated'
    }
    res.send({
      jsonResponse
    });
  });
}


/* Delete Airline*/
exports.deleteAirline = (req, res) => {
  const d_Airline = {
    id_airline: req.params.id_airline
  }
  Airline.findOneAndDelete(d_Airline, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id Airline does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_delete: 'Airline deleted'
    }
    res.send({
      jsonResponse
    });
  });
}

exports.getIdsAirline = (req, res, next) => {
  Airline.find({}, {
    id_airline: 1,
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


exports.getAllFlightsSales = (req, res, next) => {
  Airline.aggregate([{
    $lookup: {
      from: "flights",
      localField: "id_airline",
      foreignField: "id_airline",
      as: "flights"
    }
  }, {
    $unwind: {
      path: "$flights",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "sales",
      localField: "flights.id_flight",
      foreignField: "id_flight",
      as: "flights.sales",
    }
  }, {
    $group: {
      _id: "$_id",
      idAirline: {
        $first: "$id_airline"
      },
      flights: {
        $push: "$flights"
      }
    }
  }, {
    $project: {
      _id: 1,
      idAirline: 1,
      "flights.id_flight": 1,
      "flights.price": 1,
      "flights.sales.tickets": 1
    }
  }], (err, resp) => {

    if (err) return res.status(500).send(res);
    if (!resp) {
      res.send({
        message: 'Something is wrong'
      });
    } else {
      if (resp.length == 0) {
        res.send({
          message: "Empty"
        });

      } else {
        var si = resp.length;
        for (var i = 0; i < si; i++) {
          var a = resp[i].flights.length;
          for (var j = 0; j < a; j++) {
            var cont = 0;
            if (resp[i].flights[j].sales.length > 0) {
              for (var y = 0; y < resp[i].flights[j].sales.length; y++) {
                cont += resp[i].flights[j].sales[y].tickets;
              }
              resp[i].flights[j].sales = cont;
            }
          }
        }
        res.send(
          resp
        );
      }
    }
  });
}