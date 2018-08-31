'use strict';
const express = require('express');
const router = express.Router();
const jugador = require('./jugadores.api');

router.route('/registrar_jugador')
    .post(function (req, res) {
        jugador.registrar_jugador(req, res);
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

router.route('/actualizar_jugador')
    .post(function (req, res) {
        jugador.actualizar(req, res);
    });

router.route('/borrar_jugador')
    .post(function (req, res) {
        jugador.borrar(req, res);
    });
module.exports = router;