const Generals = require('./general.dao');

exports.getWorkAreas = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        work_area: user[0].work_area
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.getCountries = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        country: user[0].country
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.getRestrictions = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        restrictions: user[0].restrictions
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.getStatus = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        status: user[0].status
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.getRegion = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        region: user[0].region
      }
      res.send({
        jsonResponse
      });
    }
  });
}


exports.getTypeOfficial = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {      
      const jsonResponse = {
        type_official: user[0].type_official
      }
      res.send({
        jsonResponse
      });
    }
  });
}


exports.getFeatures = (req, res, next) => {
  Generals.find((err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {
      const jsonResponse = {
        features: user[0].features
      }
      res.send({
        jsonResponse
      });
    }
  });
}