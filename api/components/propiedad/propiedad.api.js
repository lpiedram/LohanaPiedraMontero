'use strict';

const propiedadModel = require('./propiedad.model');

//Función para registrar una propiedad
module.exports.registrar_propiedad = function (req, res) {
    //Crea una variable nuevaPropiedad utilizando como plantilla la propiedadModel
    let nuevaPropiedad = new propiedadModel({
        nombre: req.body.nombre,
        precio: req.body.precio
    });
    nuevaPropiedad.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la propiedad, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'La propiedad se registró con éxito' });
        }

    });
};

module.exports.listar = function (req, res) {
    propiedadModel.find().then(
        function (propiedad) {
            res.send(propiedad);
        }
    );
};

module.exports.buscar_propiedad_id = function (req, res) {
    propiedadModel.findById({ _id: req.body.id }).then(
        function (propiedad) {
            res.send(propiedad);
        }
    );
};


module.exports.actualizar = function (req, res) {
    propiedadModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.borrar = function (req, res) {
    propiedadModel.findByIdAndDelete(req.body._id,
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha borrado la propiedad.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La propiedad se ha eliminado correctamente.' + res });
            }
        });
};