const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
  const newUser = {
    user_id: req.body.user_id,
    id_rol: req.body.id_rol,
    password: bcrypt.hashSync(req.body.password),
    username: req.body.username,
    name: req.body.name,
    birth: req.body.birth,
    phone: req.body.phone,
    email: req.body.email,
  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id already exists'
    });
    if (err) return res.status(500).send(err);
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({
        id: user.id
      },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const jsonResponse = {
      rol: user.id_rol,
      id_user: user.user_id,
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
    username: req.body.username,
    password: req.body.password
  }
  User.findOne({
    username: userData.username
  }, (err, user) => {
    if (err) return res.status(500).send(err);

    if (!user) {
      // username does not exist
      res.send({
        message: 'user does not exist'
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
          rol: user.id_rol,
          username: user.username,
          name: user.name,
          birthday: user.birth,
          email: user.email,
          id: user.user_id,
          phone: user.phone,
          accessToken: accessToken,
          expiresIn: expiresIn
        };

        res.send({
          jsonResponse
        });
      } else {
        // password wrong
        res.send({
          message: 'password wrong'
        });
      }
    }
  });
}


/* Read Admin User */
exports.readUser = (req, res, next) => {
  const userData = {
    username: req.params.username
  }
  User.findOne({
    username: userData.username
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
        id_rol: resp.id_rol
      }
      res.send({
        jsonResponse
      });
    }
  });
}

exports.deleteUser = (req, res) => {
  const deleteUser = {
    username: req.params.username
  }
  User.findOneAndDelete(deleteUser, (err, resp) => {
    if (err == null && resp == null) return res.send({
      message: 'Id User does not exists'
    });
    if (err) return res.status(500).send(err);
    const jsonResponse = {
      m_delete: 'User deleted'
    }
    res.send({
      jsonResponse
    });
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