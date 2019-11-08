const Official = require('./official.dao');
const bcrypt = require('bcryptjs');

exports.createOfficial = (req, res, next) => {
  const newOfficial = {
    id_user: req.body.id_user,
    name: req.body.name,
    type: req.body.type,
    date_admission: req.body.date_admission,
    work_area: req.body.work_area,
    rol: "official",
    password: bcrypt.hashSync(req.body.password),
  }

  Official.create(newOfficial, (err, resp) => {
    if (err && err.code === 11000) return res.send({
      message: 'Id Official(User) already exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      id_user: resp.id_user,
      name: resp.name,
      type: resp.type,
      date_admission: resp.date_admission,
      work_area: resp.work_area,
      rol: resp.rol,
      password: resp.password
    }
    res.send({
      jsonResponse
    });
  });
}



exports.readOfficial = (req, res, next) => {
  const userData = {
    id_user: req.body.id_user
  }
  Official.findOne({
    id_user: userData.id_user
  }, (err, resp) => {
    if (err) return res.status(500).send('Server error!');
    if (!resp) {
      res.status(409).send({
        message: 'Something is wrong'
      });
    } else {

      const jsonResponse = {
        id_user: resp.id_user,
        name: resp.name,
        type: resp.type,
        date_admission: resp.date_admission,
        work_area: resp.work_area,
        rol: resp.rol,
        password: resp.password
      }
      res.send({
        jsonResponse
      });
    }
  });
}



/* Update Official */
exports.updateOfficial = (req, res) => {
  const currentOfficial = {
    id_user: req.params.id_user,  /* body >< params  */
  }
  const updateOfficial = {
    id_user: req.params.id_user,  /* body >< params  */
    name: req.body.name,
    type: req.body.type,
    date_admission: req.body.date_admission,
    work_area: req.body.work_area
  }

  Official.findOneAndUpdate(currentOfficial, updateOfficial, (err, resp) => {
    
    if (!err && !resp) return res.send({
      message: 'Id Official does not exists'
    });
    if (err) return res.status(500).send('Server error');
    const jsonResponse = {
      m_update: 'Official updated'
    }
    res.send({
      jsonResponse
    });
  });
}


/* Delete Official : User */
exports.deleteOfficial = (req, res) => {
  const newUser = {
    id_user: req.params.id_user
  }
  Official.findOneAndDelete(newUser, (err, resp) => {
    if (err==null && resp==null) return res.send({
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
