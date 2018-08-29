'use strict';
let mongoose = require('mongoose');

let jugadorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    alias: { type: String, required: true },
    dinero: { type: Number, required: false },
    foto: { type: String }
});

module.exports = mongoose.model('Jugador', jugadorSchema);