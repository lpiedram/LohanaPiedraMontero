'use strict';
const express = require('express');
const router = express.Router();
const compra = require('./compras.api');

router.route('/registrar_compra')
    .post(function (req, res) {
        compra.registrar_compra(req, res);
    });

router.route('/listar_propiedad_comprada')
    .get(function (req, res) {
        compra.obtenerListaPropiedadesCompradas(req, res);
    });

router.route('/listar_jugadores')
    .post(function (req, res) {
        compra.obtenerListaJugadores(req, res);
    });

router.route('/buscar_jugador_id')
    .post(function (req, res) {
        compra.obtenerJugadorPorId(req, res);
    });

router.route('/borrar_compra')
    .post(function (req, res) {
        compra.borrarCompraPorId(req, res);
    });
module.exports = router;