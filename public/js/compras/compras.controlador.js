'use strict'

let listaPropiedades = imprimirListaPropiedadesCompradas();
let idPropiedadSeleccionada = '';

imprimirListaPropiedadesCompradas();

const nombrePropiedad = document.querySelector('#txtNombre');
const precio = document.querySelector('#txtPrecio');
const jugador = document.querySelector('#sltJugador');

const btnComprar = document.querySelector('#btnComprar');

btnComprar.addEventListener('click', comprar);

function comprar() {

    let bError = false;

    let sNombre = nombrePropiedad.value;
    let sPrecio = precio.value;
    let sDuenno = jugador.value;

    bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar la compra',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Continuar'
        });
        console.log('No se pudo registrar la compra');
    } else {
        console.log(imagenUrl);
        registrarCompra(sNombre, sPrecio, sDuenno);
        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'La compra se registró adecuadamente',
            confirmButtonText: 'Continuar'
        });
        listaCompra = obtenerListaCompras();
        imprimirListaPropiedadesCompradas();
        limpiarFormulario();
    }
};

function mostrarJugador() {
    let mlistaJugador = obtenerDatos();
    let selectJugador = document.querySelector('#sltJugador');

    for (let i = 0; i < mlistaJugador.length; i++) {
        let opcion = document.createElement('option'); //crea el elemento option
        opcion.value = mlistaJugador[i][1]; //Agregar el value que se puede obtener al seleccionar una opcion
        opcion.text = mlistaJugador[i][1]; // el texto que se va a mostrar para cada opcion

        selectJugador.appendChild(opcion);
    }
}

function imprimirListaPropiedadesCompradas(pFiltro) {

    let tbody = document.querySelector('#tblPropiedad tbody');
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
            let aModificar = document.createElement('a');
            aModificar.classList.add('fas');
            aModificar.classList.add('fa-pen');
            aModificar.dataset._id = listaPropiedades[i]['_id'];

            let aBorrar = document.createElement('a');
            aBorrar.classList.add('fas');
            aBorrar.classList.add('fa-trash');
            aBorrar.dataset._id = listaPropiedades[i]['_id'];

            aModificar.addEventListener('click', llenarDatosFormulario);
            aBorrar.addEventListener('click', borrarPropiedad);

            cConfiguracion.appendChild(aModificar);
            cConfiguracion.appendChild(aBorrar);

        }
    }
}

function limpiarFormulario() {
    nombrePropiedad.value = '';
    precio.value = '';
    idPropiedadSeleccionada = '';
    jugador.value = '';
};

function llenarDatosFormulario() {
    idPropiedadSeleccionada = this.dataset._id;// se obtiene el id del usuario seleccionado

    let usuario = obtenerPropiedadPorId(idPropiedadSeleccionada);

    editNombrePropiedad.value = usuario['nombre'];
    editPrecio.value = usuario['precio'];
};

function borrarCompra() {
    let id = this.dataset._id;
    borrarCompraPorId(id);
    listaCompra = obtenerListaCompras();
    imprimirListaPropiedadesCompradas();
}