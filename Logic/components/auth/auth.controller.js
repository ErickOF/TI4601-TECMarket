const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
  const newUser = {
    /* General auth Admin*/
    id_user: req.body.id_user,
    rol: req.body.rol,
    password: bcrypt.hashSync(req.body.password),
    /* Passenger */
    name: req.body.name,
    date_birth: req.body.date_birth,
    nationality: req.body.nationality,
    residence: req.body.residence,
    phone: req.body.phone,
    email: req.body.email,
    /* Official */
    type: req.body.type,
    date_admission: req.body.date_admission,
    work_area: req.body.work_area
  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id already exists'
    });
    if (err) return res.status(500).send('Server error');
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({
        id: user.id
      },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const jsonResponse = {
      rol: user.rol,
      id_user: user.id_user,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    res.send({
      jsonResponse
    });
  });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    id_user: req.body.id_user,
    password: req.body.password
  }
  User.findOne({
    id_user: userData.id_user
  }, (err, user) => {
    if (err) return res.status(500).send('Server error!');

    if (!user) {
      // id_user does not exist
      res.send({
        message: 'Something is wrong'
      });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({
          id: user.id
        }, SECRET_KEY, {
          expiresIn: expiresIn
        });
        const jsonResponse = {
          rol: user.rol,
          id_user: user.id_user,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({
          jsonResponse
        });
      } else {
        // password wrong
        res.send({
          message: 'Something is wrong'
        });
      }
    }
  });
}


/* Read Admin User */
exports.readUser = (req, res, next) => {
  const userData = {
    id_user: req.params.id_user
  }
  User.findOne({
    id_user: userData.id_user
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id User does not exists'
      });
    } else {
      const jsonResponse = {
        name: resp.name,
        type: resp.type,
        date_admission: resp.date_admission,
        rol: resp.rol,
        work_area: resp.work_area
      }
      res.send({
        jsonResponse
      });
    }
  });
}


/* Read Passenger User */
exports.readPassenger = (req, res, next) => {
  const user_passenger_Data = {
    id_user: req.params.id_user
  }
  User.findOne({
    id_user: user_passenger_Data.id_user,
    rol: {
      $eq: 'passenger'
    }
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id User does not exists'
      });
    } else {
      const jsonResponse = {
        name: resp.name,
        date_birth: resp.date_birth,
        nationality: resp.nationality,
        residence: resp.residence,
        phone: resp.phone,
        email: resp.email,
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Update Passenger */
exports.updatePassenger = (req, res) => {
  const currentPassenger = {
    id_user: req.params.id_user,
    /* body >< params  */
  }
  const updatePassenger = {
    id_user: req.params.id_user,
    /* body >< params  */
    name: req.body.name,
    date_birth: req.body.date_birth,
    nationality: req.body.nationality,
    residence: req.body.residence,
    phone: req.body.phone,
    email: req.body.email,
  }

  User.findOneAndUpdate(currentPassenger, updatePassenger, (err, resp) => {

    if (!err && !resp) return res.send({
      message: 'Id Passenger does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_update: 'Passenger updated'
    }
    res.send({
      jsonResponse
    });
  });
}



exports.deleteUser = (req, res) => {
  const deleteUser = {
    id_user: req.params.id_user
  }
  User.findOneAndDelete(deleteUser, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id User does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_delete: 'User deleted'
    }
    res.send({
      jsonResponse
    });
  });
}

/* Get Email Passenger */
exports.getEmail = (req, res, next) => {
  const user_passenger_Data = {
    id_user: req.params.id_user
  }
  User.findOne({
    id_user: user_passenger_Data.id_user
  }, {
    email: 1,
    _id: 0
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.send({
        message: 'Id User does not exists'
      });
    } else {
      const jsonResponse = {
        name: resp.name,
        email: resp.email,
      }
      res.send({
        jsonResponse
      });
    }
  });
}

/* Send Email Passenger */
exports.sendEmail = (req, res, next) => {


  /* Deberia usar este email */
  let user_email = req.params.email;
  let code_id = req.params._id;
  let flight = req.params.id_flight;

  var nodemailer = require('nodemailer');

  var mailOptions = {
    from: 'tecplanecompany@gmail.com',
    to: user_email,
    subject: 'Ticket purchase at TECPlane',
    html: '<h1>Welcome to TECPlane</h1><br>' +
      '<i>Thank you for your purchase</i>' +
      '<br>to complete the <strong>Check In</strong> process, please enter the following information.' +
      '<p>Id Flight : </p> <p style="color:blue;"><ins>' + flight +
      '</ins></p> <br><p>Ticket Code : <p style="color:blue;"><ins>' + code_id +
      '</ins></p><br><br>Greetings and good trip.'
  };



  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'tecplanecompany@gmail.com',
      pass: 'tecplane1234'
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send({
        message: "Email Not Sent"
      })
    } else {
      res.send({
        info: "Email Sent"
      })
    }
  });




}



exports.getIdsUser_Official = (req, res, next) => {
  User.find({
    rol: 'official'
  }, {
    id_user: 1,
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

exports.getNamesPassengers = (req, res, next) => {
  User.find({
    rol: 'passenger'
  }, {
    name: 1,
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

/* Get Id User  */
exports.getID_user = (req, res, next) => {
  const userData = {
    name_user: req.params.name_user
  }
  User.findOne({
    name: userData.name_user
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');    
    if (!resp) {
      res.send({
        message: 'User with this name does not exists'
      });
    } else {
      const jsonResponse = {
        id_user: resp.id_user
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.getUserRange = (req, res, next) => {
  User.aggregate([
    {
      $match:{rol:"passenger"}
    },
    {
      $lookup: {
        from: "sales",
        localField: "id_user",
        foreignField: "id_user",
        as: "sales"
      }
    },
    {   
      $project:{
          _id : 1,
          id_user : 1,
          name:1,
          "min": { "$min": "$sales.tickets" },
          "max": { "$max": "$sales.tickets" }
      } 
  }
  ], (err, resp) => {

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
  })
}