'use strict';

const comprasModel = require('./compras.model');

//Función para registrar una compra
module.exports.registrarCompra = function (req, res) {
    //Crea una variable nuevaCompra utilizando como plantilla el comprasModel
    let nuevaCompra = new comprasModel({
        nombre: req.body.nombre,
        precio: req.body.precio,
        duenno: req.boy.duenno
    });
    nuevaCompra.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la compra, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'La compra se registró con éxito' });
        }

    });
};

module.exports.listar_propiedad_comprada = function (req, res) {
    comprasModel.find().then(
        function (compras) {
            res.send(compras);
        }
    );
};

module.exports.listar_jugadores = function (req, res) {
    jugadorModel.findById({ _id: req.body.id }).then(
        function (jugador) {
            res.send(jugador);
        }
    );
};

module.exports.buscar_jugador_id = function (req, res) {
    jugadorModel.findById({ _id: req.body.id }).then(
        function (jugador) {
            res.send(jugador);
        }
    );
};

module.exports.borrar_compra = function (req, res) {
    jugadorModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado la compra.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La compra se ha eliminado correctamente.' + res });
            }
        });
};