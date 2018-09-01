'use strict';
const express = require('express');
const router = express.Router();
const propiedad = require('./propiedad.api');

router.route('/registrar_propiedad')
    .post(function (req, res) {
        propiedad.registrar_propiedad(req, res);
    });

router.route('/listar_propiedad')
    .get(function (req, res) {
        propiedad.listar(req, res);
    });

router.route('/buscar_propiedad_id')
    .post(function (req, res) {
        propiedad.buscar_propiedad_id(req, res);
    });

router.route('/agregar_propiedad')
    .post(function (req, res) {
        propiedad.agregar_propiedad(req, res);
    });

router.route('/actualizar_propiedad')
    .post(function (req, res) {
        propiedad.actualizar(req, res);
    });

router.route('/borrar_propiedad')
    .post(function (req, res) {
        propiedad.borrar(req, res);
    });
module.exports = router;