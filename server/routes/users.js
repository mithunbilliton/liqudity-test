var express = require('express');
var router = express.Router();
var user = require('../controller/user');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 **_ To create the New user
 _**/
router.post('/', user.create);
router.get('/user/:emailId', user.find);
router.get('/user', user.findAll);
router.put('/updatebyid', user.updateById);
router.put('/update', user.update);
router.delete('/delete', user.delete);

module.exports = router;