'use strict'

let listaPropiedades = obtenerListaPropiedades();
let idPropiedadSeleccionada = '';

imprimirListaPropiedades();

const nombrePropiedad = document.querySelector('#txtNombre');
const precio = document.querySelector('#txtPrecio');

const editNombrePropiedad = document.querySelector('#txtEditarNombre');
const editPrecio = document.querySelector('#txtEditarPrecio');

const btnRegistrarPropiedad = document.querySelector('#btnRegistrar');
const btnActualizarPropiedad = document.querySelector('#btnActualizar');

btnRegistrarPropiedad.addEventListener('click', obtenerDatos);
btnActualizarPropiedad.addEventListener('click', obtenerDatosEditar);

function obtenerDatos() {
    let bError = false;

    let sNombre = nombrePropiedad.value;
    let sPrecio = precio.value;

    bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar la propiedad',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Continuar'
        });
        console.log('No se pudo registrar la propiedad');
    } else {
        console.log(imagenUrl);
        registrarPropiedad(sNombre, sPrecio);
        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'La propiedad se registró adecuadamente',
            confirmButtonText: 'Continuar'
        });
        listaPropiedades = obtenerListaPropiedades();
        imprimirListaPropiedades();
        limpiarFormulario();
    }
}

function obtenerDatosEditar() {

    let bError = false;

    let sNombre = editNombrePropiedad.value;
    let sPrecio = editPrecio.value;

    //bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar la propiedad',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
        console.log('No se pudo registrar la propiedad');
    } else {
        console.log(imagenUrl);
        actualizarPropiedad(idPropiedadSeleccionada, sNombre, sPrecio);
        swal({
            type: 'success',
            title: 'Propiedad actualizada',
            text: 'La propiedad se actualizó adecuadamente',
            confirmButtonText: 'Entendido'
        });
        listaPropiedades = obtenerListaPropiedades();
        imprimirListaPropiedades();
        limpiarFormulario();
        btnActualizarPropiedad.hidden = true;
        btnRegistrarPropiedad.hidden = false;
    }
};

function imprimirListaPropiedades(pFiltro) {

    let tbody = document.querySelector('#tblCompras tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for (let i = 0; i < listaPropiedades.length; i++) {
        if (listaPropiedades[i]['nombre'].toLowerCase().includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let cid = fila.insertCell();
            let cNombre = fila.insertCell();
            let cPrecio = fila.insertCell();
            let cDuenno = fila.insertCell();
            let cConfiguracion = fila.insertCell();

            cid.innerHTML = listaPropiedades[i]['_id'];
            cNombre.innerHTML = listaPropiedades[i]['nombre'];
            cPrecio.innerHTML = listaPropiedades[i]['precio'];
            cDuenno.innerHTML = listaPropiedades[i]['duenno'];

            //Íconos para editar
            let aComprar = document.createElement('a');
            aComprar.classList.add('fas');
            aComprar.classList.add('fa-shopping-cart');
            aComprar.dataset._id = listaPropiedades[i]['_id'];

            let aBorrar = document.createElement('a');
            aBorrar.classList.add('fas');
            aBorrar.classList.add('fa-trash');
            aBorrar.dataset._id = listaPropiedades[i]['_id'];

            aComprar.addEventListener('click', llenarDatosFormulario);
            aBorrar.addEventListener('click', borrarPropiedad);

            cConfiguracion.appendChild(aComprar);
            cConfiguracion.appendChild(aBorrar);

        }
    }
}

function validar() {
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;

    //Validación del nombre
    if (nombrePropiedad.value == '' || (regexSoloLetras.test(nombrePropiedad.value) == false)) {
        nombrePropiedad.classList.add('error_input');
        bError = true;
    } else {
        nombrePropiedad.classList.remove('error_input');
    }

    return bError;
};

function limpiarFormulario() {
    nombrePropiedad.value = '';
    precio.value = '';
    idPropiedadSeleccionada = '';

    editNombrePropiedad.value = '';
    editPrecio.value = '';
    idPropiedadSeleccionada = '';
};

function llenarDatosFormulario() {
    btnRegistrarPropiedad.hidden = true;
    btnActualizarPropiedad.hidden = false;

    idPropiedadSeleccionada = this.dataset._id;// se obtiene el id del usuario seleccionado

    let usuario = obtenerPropiedadPorId(idPropiedadSeleccionada);

    editNombrePropiedad.value = usuario['nombre'];
    editPrecio.value = usuario['precio'];
};

function borrarPropiedad() {
    let id = this.dataset._id;
    borrarPropiedadPorId(id);
    listaPropiedades = obtenerListaPropiedades();
    imprimirListaPropiedades();

}