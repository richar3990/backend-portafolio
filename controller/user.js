'use strict'
var User = require('../models/user');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var controller = {
    test: function (req, res){
        return res.status(200).send({
            message: 'Soy el metodo o accion del del controlador user'
        });
    },
    saveUser: function (req, res){
        var user = new User();
        var params = req.body;
        user.userName = params.Username;
        user.password = params.password;
        console.log("Llego : "+ user.userName);
        User.find({userName: params.Username}).exec()
            .then(user =>{
                if (user.length >= 1){
                    return res.status(409).send({
                        message: 'Usuario ya existe'
                    });
                }else{
                    bcrypt.hash(params.password, 10, (err, hash) =>{
                        if (err){
                            return res.status(500).send({
                                message: 'hubo un error al crear hash'
                            });
                        }else{
                            var user = new User();
                            var params = req.body;
                            user.userName = params.Username;
                            user.password = hash;
                            user.save((err, userStored)=>{
                                if (err) return res.status(500).send({message: err});
                                if (!userStored) res.status(404).send({message: 'No se ha podido guardar el usuario'});
                                return res.status(200).send({user: userStored});
                            });
                        }
                    });
                }
            });
    },
    loginUser: function (req, res){
        var user = new User();
        var params = req.body;
        user.userName = params.Username;
        user.password = params.password;
        User.find({userName: params.Username}).exec()
            .then(user =>{
                console.log(params.Username);
                if (user.length < 1){
                    return res.status(401).json({
                        message: 'Usuario o contrasena invalido'
                    });
                }
                bcrypt.compare(req.body.password, user[0].password,(err, result) =>{
                    console.log("ingresado: "+req.body.password);
                    console.log("en bd: "+user[0].password);
                    console.log("resultad: "+result);
                    if (!result){
                        return res.status(401).json({
                            message: 'Error en compare'
                        });
                    }
                    if (result){
                        return res.status(200).json({
                            message: 'Usuario logeado'
                        });
                    }
                });
            });
    },
    // saveUser: function (req, res){
    //     var user = new User();
    //     var params = req.body;
    //
    //     user.userName = params.userName;
    //     user.password = params.password;
    //     user.save((err, userStored)=>{
    //         if (err) return res.status(500).send({message: err});
    //         if (!userStored) res.status(404).send({message: 'No se ha podido guardar el documento'});
    //         return res.status(200).send({user: userStored});
    //     });
    // },
    deleteUser: function (req, res) {
        var userId = req.params.id;
        User.findOneAndRemove({_id: userId},function (err){
            if (err){
                return res.status(500).send({message: 'Error al guardar usuario'});
            }
            return res.status(200).send({message: 'Usuario eliminado'});
        });
    },
    getUsers: function (req, res) {
        User.find({}).exec((err, users)=>{
            if (err) return res.status(500).send({message: 'Error al devolver datos'});
            if (!users) res.status(404).send({message: 'No hay proyectos que mostrar'});
            return res.status(200).send({users});

        });

    }
};
module.exports = controller;
