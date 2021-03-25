'use strict'
var express = require('express');
var ProjectController = require('../controller/project');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });
 router.get('/home', ProjectController.home);
 router.post('/test', ProjectController.test);
 router.post('/save-project', ProjectController.saveProject);
 router.get('/project/:id?', ProjectController.getProject);
 router.get('/projects', ProjectController.getProjects);
 router.delete('/project/:id', ProjectController.deleteProject);
router.delete('/project2/:id', ProjectController.deleteProject2);
 router.put('/update-project/:id', ProjectController.updateProject);
 router.post('/upload-image/:id',multipartMiddleware, ProjectController.uploadImage);
 router.get('/get-image/:image', ProjectController.getImagefile);


 module.exports = router;
