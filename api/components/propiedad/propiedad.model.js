'use strict';
let mongoose = require('mongoose');

let propiedadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: String, required: true }
});

module.exports = mongoose.model('Propiedad', propiedadSchema);