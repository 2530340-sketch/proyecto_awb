// Se crea la varaible que va hacer que los elementos se hagan tipo JSON
let actividad = JSON.parse(localStorage.getItem("actividadesAcademicas")) || [];

//La creacion de la fucnion de guardar
function guardar() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividad));
}

//Se crea el evento de subir el formulario y se hace la funcion de guardar y pintar
document.querySelector("#formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();

    let datoss = new FormData(evento.target);
    let actividadA = Object.fromEntries(datoss);
    actividadA.id = Date.now();
    actividad.push(actividadA);
    guardar();
    evento.target.reset();
    pintar();
});

// tomamos los elementos del formulario de busqueda
const inputBuscar = document.querySelector("#buscar");
const selectEstatus2 = document.querySelector('[name="Estatus2"]');
const selectPrioridad2 = document.querySelector('[name="prioridad2"]');

//escuchan los eventos para actualizar la vista en tiempo real
inputBuscar.addEventListener("input", pintar);
selectEstatus2.addEventListener("change", pintar);
selectPrioridad2.addEventListener("change", pintar);

// Se hace la funcion de pintar
function pintar() {
    let totalPendientes = actividad.filter(a => a.Estatus === "pendiente").length;
    let totalEnProgreso = actividad.filter(a => a.Estatus === "en progreso").length;
    let totalCompletadas = actividad.filter(a => a.Estatus === "completado").length;

    let divResultado = document.querySelector("#resultado");

    divResultado.innerHTML = `
        <div class="tarjeta-indicador">
            <span class="titulo-indicador">Pendientes</span>
            <span class="valor-indicador">${totalPendientes}</span>
        </div>
        <div class="tarjeta-indicador">
            <span class="titulo-indicador">En Progreso</span>
            <span class="valor-indicador">${totalEnProgreso}</span>
        </div>
        <div class="tarjeta-indicador">
            <span class="titulo-indicador">Completadas</span>
            <span class="valor-indicador">${totalCompletadas}</span>
        </div>
    `;

    let cont = document.querySelector("#resultado2");
    cont.replaceChildren();

    let textoBusqueda = inputBuscar.value.toLowerCase().trim();
    let estatusFiltro = selectEstatus2.value;
    let prioridadFiltro = selectPrioridad2.value;

    let actividadesFiltradas = actividad.filter(acts => {
        let coincideTexto = (acts.titulo || "").toLowerCase().includes(textoBusqueda) ||
                            (acts.materia || "").toLowerCase().includes(textoBusqueda);

        let coincideEstatus = estatusFiltro === "" || acts.Estatus === estatusFiltro;
        let coincidePrioridad = prioridadFiltro === "" || acts.prioridad === prioridadFiltro;

        return coincideTexto && coincideEstatus && coincidePrioridad;
    });

    [...actividadesFiltradas]
<<<<<<< HEAD
        //ordena la actividad de la mas nueva a la mas vieja
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .forEach((acts) => {

            // indice real en el arreglo principal para eliminar o editar correctamente
            let indiceReal = actividad.indexOf(acts);

            let tarjeta = document.createElement("div");
            tarjeta.classList.add("nota-card");

            //se hacen los elementos para la nota o de la actividad
            let titulo = document.createElement("h2");
            titulo.textContent = acts.titulo;

            let materia = document.createElement("p");
            materia.textContent = "Materia: " + acts.materia;

            let date = document.createElement("p");
            date.textContent = "Fecha: " + acts.fecha;

            let descripcion = document.createElement("p");
            descripcion.textContent = "Descripción: " + acts.descripcion;

            let prioridad = document.createElement("p");
            prioridad.textContent = "Prioridad: " + acts.prioridad;

            let estado = document.createElement("p");
            estado.textContent = "Estado: " + acts.Estatus;

            // Contenedor de botones de accion eliminar y editar
            let contenedorBotones = document.createElement("div");
            contenedorBotones.classList.add("botones-tarjeta");
            contenedorBotones.innerHTML = `<button class="btn-editar">Editar</button><button class="btn-eliminar">Eliminar</button>`;

            // Logica del boton Editar
            contenedorBotones.querySelector(".btn-editar").addEventListener("click", () => {
                let nuevoTitulo = prompt("Edita el titulo de la actividad:", acts.titulo);

                if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
                    acts.titulo = nuevoTitulo.trim();
                    guardar();
                    pintar();
                }
            });

            // Logica del boton Eliminar
            contenedorBotones.querySelector(".btn-eliminar").addEventListener("click", () => {
                // busca exactamente el indice del elemento que tiene el mismo id
                let indexReal = actividad.findIndex(item => item.id === acts.id);

                if (indexReal !== -1) {
                    actividad.splice(indexReal, 1);
                    guardar();
                    pintar();
                }
            });

            // todos los elementos dentro de la tarjeta
            tarjeta.append(titulo);
            tarjeta.append(materia);
            tarjeta.append(date);
            tarjeta.append(descripcion);
            tarjeta.append(prioridad);
            tarjeta.append(estado);
            tarjeta.append(contenedorBotones);

            // la nota completa al contenedor principal
            cont.append(tarjeta);
        });
}

pintar();
=======
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .forEach((acts) => {
         let indiceReal = actividad.indexOf(acts);
         let tarjeta = document.createElement("div");
         tarjeta.classList.add("nota-card");

         let titulo = document.createElement("h2");
         titulo.textContent = acts.titulo;
         
         let materia = document.createElement("p");
         materia.textContent = "Materia: " + acts.materia;

         let date = document.createElement("p");
         date.textContent = "Fecha: " + acts.fecha;
         
         let descripcion = document.createElement("p");
         descripcion.textContent = "Descripción: " + acts.descripcion;

         let prioridad = document.createElement("p");
         prioridad.textContent = "Prioridad: " + acts.prioridad;

         let estado = document.createElement("p");
         estado.textContent = "Estado: " + acts.Estatus;

        let contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("botones-tarjeta");
        contenedorBotones.innerHTML = `<button class="btn-editar">Editar</button><button class="btn-eliminar">Eliminar</button>`;

        contenedorBotones.querySelector(".btn-editar").addEventListener("click", () => {
            let nuevoTitulo = prompt("Edita el titulo de la actividad:", acts.titulo);
            if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
                acts.titulo = nuevoTitulo.trim();
                guardar();
                pintar();
            }
        });

        contenedorBotones.querySelector(".btn-eliminar").addEventListener("click", () => {
        let indexReal = actividad.findIndex(item => item.id === acts.id);
        if (indexReal !== -1) {
            actividad.splice(indexReal, 1);
            guardar();
            pintar();
        }
    });

    tarjeta.append(titulo);
    tarjeta.append(materia);
    tarjeta.append(date);
    tarjeta.append(descripcion);
    tarjeta.append(prioridad);
    tarjeta.append(estado);
    tarjeta.append(contenedorBotones);

    cont.append(tarjeta);
});
}

pintar();


// ==========================================================
// NUEVO: CONTROL DE VISTAS (Pégalo al final de tu app.js)
// ==========================================================
function cambiarVista(nombreVista) {
    // 1. Ocultar todas las secciones
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.classList.remove("active");
    });

    // 2. Mostrar la sección seleccionada si existe
    const vistaDestino = document.querySelector(`#${nombreVista}`);
    if (vistaDestino) {
        vistaDestino.classList.add("active");
    }
}
>>>>>>> c435e07 (Actualizacion de codigo para practicas)
