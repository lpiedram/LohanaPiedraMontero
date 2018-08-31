'use strict';
const express = require('express');
const router = express.Router();
const jugador = require('./jugadores.api');

router.route('/registrarjugador')
    .post(function (req, res) {
        jugador.registrar(req, res);
    });

router.route('/listar_jugadores')
    .get(function (req, res) {
        jugador.listar(req, res);
    });

router.route('/buscar_jugador_id')
    .post(function (req, res) {
        jugador.buscar_jugador_id(req, res);
    });

router.route('/agregar_propiedad')
    .post(function (req, res) {
        jugador.agregar_propiedad(req, res);
    });

module.exports = router;