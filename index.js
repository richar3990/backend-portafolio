'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/portafolio')
mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Conexion a la base de datos establecida..");
        //creacion del servidor
        app.listen(port, () =>{
           console.log("Servidor corriendo en localhost:3700");
        });
    })
    .catch(err => console.log(err));
