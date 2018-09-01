'use strict';
let mongoose = require('mongoose');

let compraSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    duenno: {type: String, required: true}
});

module.exports = mongoose.model('Compra', compraSchema);