'use strict'
var express = require('express');
var UserController = require('../controller/user');
var router = express.Router();
router.post('/Usertest', UserController.test);
router.post('/save-user', UserController.saveUser);
router.delete('/delete-user/:id', UserController.deleteUser);

module.exports = router;
