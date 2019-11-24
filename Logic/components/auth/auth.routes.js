const Users = require('./auth.controller');

module.exports = (router) => {
  /* Auth  Users*/
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.delete('/deleteUser/:username', Users.deleteUser);
  router.get('/readUser/:username', Users.readUser);
}