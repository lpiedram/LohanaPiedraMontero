'use strict'

let listaJugadores = obtenerListaJugadores();
let idJugadorSeleccionado = '';

imprimirListaJugadores();

const nombre = document.querySelector('#txtNombre');
const alias = document.querySelector('#txtAlias');
const imagen = document.querySelector('#txtImagen');

const editNombre = document.querySelector('#txtEditNombre');
const editAlias = document.querySelector('#txtEditAlias');
const editDinero = document.querySelector('#txtEditDinero');
const editImagen = document.querySelector('#txtEditImagen');

const btnRegistrar = document.querySelector('#btnRegistrar');
const btnActualizar = document.querySelector('#btnActualizar');

btnRegistrar.addEventListener('click', obtenerDatos);
btnActualizar.addEventListener('click', obtenerDatosEditar);

function obtenerDatos() {
    let bError = false;

    let sNombre = nombre.value;
    let sAlias = alias.value;
    let sdinero = 1000;

    bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el jugador',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Continuar'
        });
        console.log('No se pudo registrar el usuario');
    } else {
        console.log(imagenUrl);
        registrarJugador(sNombre, sAlias, sdinero, imagenUrl);
        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'El jugador se registró adecuadamente',
            confirmButtonText: 'Continuar'
        });
        listaJugadores = obtenerListaJugadores();
        imprimirListaJugadores();
        limpiarFormulario();
    }
}

function obtenerDatosEditar() {

    let bError = false;

    let sNombre = editNombre.value;
    let sAlias = editAlias.value;
    let sDinero = editDinero.value;

    //bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el usuario',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
        console.log('No se pudo registrar el usuario');
    } else {
        console.log(imagenUrl);
        actualizarJuagdor(idJugadorSeleccionado, sNombre, sAlias, sDinero, imagen.src);
        swal({
            type: 'success',
            title: 'Usuario actualizado',
            text: 'El usuario se actualizó adecuadamente',
            confirmButtonText: 'Entendido'
        });
        listaJugadores = obtenerListaJugadores();
        imprimirListaJugadores();
        limpiarFormulario();
    }
};

function imprimirListaJugadores(pFiltro) {

    let tbody = document.querySelector('#tblJugador tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for (let i = 0; i < listaJugadores.length; i++) {
        if (listaJugadores[i]['nombre'].toLowerCase().includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();
            
            let cid = fila.insertCell();
            let cNombre = fila.insertCell();
            let cAlias = fila.insertCell();
            let cMonto = fila.insertCell();
            let cFoto = fila.insertCell();
            let cConfiguracion = fila.insertCell();

            let imagen = document.createElement('img');
            imagen.src = listaJugadores[i]['foto'];
            imagen.classList.add('imageSettings');

            cFoto.appendChild(imagen);

            cid.innerHTML = listaJugadores[i]['_id'];
            cNombre.innerHTML = listaJugadores[i]['nombre'];
            cAlias.innerHTML = listaJugadores[i]['alias'];
            cMonto.innerHTML = listaJugadores[i]['dinero'];

            //Íconos para editar
            let aModificar = document.createElement('a');
            aModificar.classList.add('fas');
            aModificar.classList.add('fa-pen');
            aModificar.dataset._id = listaJugadores[i]['_id'];

            let aBorrar = document.createElement('a');
            aBorrar.classList.add('fas');
            aBorrar.classList.add('fa-trash');
            aBorrar.dataset._id = listaJugadores[i]['_id'];

            aModificar.addEventListener('click', llenarDatosFormulario);
            aBorrar.addEventListener('click', borrarJugador);

            cConfiguracion.appendChild(aModificar);
            cConfiguracion.appendChild(aBorrar);

        }
    }
}

function validar() {
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;

    //Validación del nombre
    if (nombre.value == '' || (regexSoloLetras.test(nombre.value) == false)) {
        nombre.classList.add('error_input');
        bError = true;
    } else {
        nombre.classList.remove('error_input');
    }
    //Validación del alias
    if (alias.value == '' || (regexSoloLetras.test(alias.value) == false)) {
        alias.classList.add('error_input');
        bError = true;
    } else {
        alias.classList.remove('error_input');
    }

    return bError;
};

function limpiarFormulario() {
    nombre.value = '';
    alias.value = '';
    idJugadorSeleccionado = '';
    imagen.src = '';

    editNombre.value = '';
    editAlias.value = '';
    editDinero.value = '';
    idJugadorSeleccionado = '';
    editImagen.src = '';
};

function llenarDatosFormulario() {
    idJugadorSeleccionado = this.dataset._id;// se obtiene el id del usuario seleccionado

    let usuario = obtenerJugadorPorId(idJugadorSeleccionado);

    editNombre.value = usuario['nombre'];
    editAlias.value = usuario['alias'];
    editDinero.value = usuario['dinero'];
    editImagen.src = usuario['foto'];
};

function borrarJugador() {
    let id = this.dataset._id;
    borrarJugadorPorId(id);
    listaJugadores = obtenerListaJugadores();
    imprimirListaJugadores();

}