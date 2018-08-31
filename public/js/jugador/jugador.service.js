'use strict'

function registrarJugador(sNombre, sAlias, sdinero, imagenUrl) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_jugador',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: sNombre,
            alias: sAlias,
            dinero: sdinero,
            foto: imagenUrl
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtenerListaJugadores() {
    let listaJugador = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_jugadores',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;

    return listaJugador;
}

function obtenerJugadorPorId(pid) {
    let jugador = '';

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_jugador_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: pid
        }
    });

    peticion.done(function (response) {
        jugador = response;
    });

    peticion.fail(function (response) {

    });
    return jugador;
};

function actualizarJuagdor(pid, sNombre, sAlias, sDinero, imagenUrl) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_jugador',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid,
            nombre: sNombre,
            alias: sAlias,
            dinero: sDinero,
            foto: imagenUrl
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function borrarJugadorPorId(pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/borrar_jugador',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}