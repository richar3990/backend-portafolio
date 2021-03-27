'use strict'
var User = require('../models/user');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var controller = {
    test: function (req, res){
        return res.status(200).send({
            message: 'Soy el metodo o accion del del controlador user'
        });
    },
    saveUser: function (req, res){
        var params = req.body;
        User.find({userName: params.userName}).exec()
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
                            user.userName = params.userName;
                            user.password = hash;
                            user.save((err, userStored)=>{
                                if (err) return res.status(500).send({message: 'Error al guardar usuario'});
                                if (!userStored) res.status(404).send({message: 'No se ha podido guardar el usuario'});
                                return res.status(200).send({user: userStored});
                            });
                        }
                    });
                }
            });
    },
    deleteUser: function (req, res) {
        var userId = req.params.id;
        User.findOneAndRemove({_id: userId},function (err){
            if (err){
                return res.status(500).send({message: 'Error al guardar usuario'});
            }
            return res.status(200).send({message: 'Usuario eliminado'});
        });
    }
};
module.exports = controller;
