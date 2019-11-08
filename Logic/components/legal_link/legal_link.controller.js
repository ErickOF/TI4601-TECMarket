const Legal_link = require('./legal_link.dao');

exports.getNationalities = (req, res, next) => {
  Legal_link.find({}, { nationality: 1, _id: 0 }, (err, resp) => {   
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

exports.getResidences = (req, res) => {
  const json = {
    nationality: req.params.nationality
  }
  Legal_link.findOne({nationality: json.nationality}, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Nationality does not exists'
      });
    } else {
      const jsonResidences = {
        residence: resp.residence,
      }
      res.send({
        jsonResidences
      });
    }
  });
}