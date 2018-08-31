'use strict';

const jugadorModel = require('./jugadores.model');

//Función para registrar un jugador
module.exports.registrar_jugador = function (req, res) {
    //Crea una variable nuevoJugador utilizando como plantilla el jugadorModel
    let nuevoJugador = new jugadorModel({
        nombre: req.body.nombre,
        alias: req.body.alias,
        dinero: req.body.dinero,
        foto: req.body.foto
    });
    nuevoJugador.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El usuario se registró con éxito' });
        }

    });
};

module.exports.listar = function (req, res) {
    jugadorModel.find().then(
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

module.exports.agregar_propiedad = function (req, res) {
    jugadorModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'propiedad':
                {
                    nombre: req.body.nombre,
                    precio: req.body.precio
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar la propiedad, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'La propiedad se registró con éxito' });
            }
        }
    )
};

module.exports.actualizar = function (req, res) {
    jugadorModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.borrar = function (req, res) {
    jugadorModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado el jugador.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El jugador se ha eliminado correctamente.' + res });
            }
        });
};