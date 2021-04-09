'use strict'
var express = require('express');
var UserController = require('../controller/user');
var router = express.Router();
router.post('/Usertest', UserController.test);
router.post('/save-user', UserController.saveUser);
router.post('/login', UserController.loginUser);
router.delete('/delete-user/:id', UserController.deleteUser);
router.get('/get-users', UserController.getUsers);

module.exports = router;
