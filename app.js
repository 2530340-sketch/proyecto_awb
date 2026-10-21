let actividad = JSON.parse(localStorage.getItem("actividadesAcademicas")) || [];

function guardar() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividad));
}

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
        let coincideTexto = acts.titulo.toLowerCase().includes(textoBusqueda) || 
                            acts.materia.toLowerCase().includes(textoBusqueda);
        let coincideEstatus = estatusFiltro === "" || acts.Estatus === estatusFiltro;
        let coincidePrioridad = prioridadFiltro === "" || acts.prioridad === prioridadFiltro;
        return coincideTexto && coincideEstatus && coincidePrioridad;
    });

    [...actividadesFiltradas]
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

        // Botón Editar toda la información
        contenedorBotones.querySelector(".btn-editar").addEventListener("click", () => {
            let nuevoTitulo = prompt("Edita el título:", acts.titulo);
            if (nuevoTitulo === null) return;

            let nuevaMateria = prompt("Edita la materia:", acts.materia);
            if (nuevaMateria === null) return;

            let nuevaDescripcion = prompt("Edita la descripción:", acts.descripcion);
            if (nuevaDescripcion === null) return;

            let nuevaFecha = prompt("Edita la fecha (AAAA-MM-DD):", acts.fecha);
            if (nuevaFecha === null) return;

            let nuevaPrioridad = prompt("Edita la prioridad (Baja, Media, Alta):", acts.prioridad);
            if (nuevaPrioridad === null) return;

            let nuevoEstatus = prompt("Edita el estado (pendiente, en progreso, completado):", acts.Estatus);
            if (nuevoEstatus === null) return;

            // Validar campos obligatorios vacíos
            if (nuevoTitulo.trim() === "" || nuevaMateria.trim() === "" || nuevaFecha.trim() === "") {
                alert("El título, la materia y la fecha son obligatorios y no pueden estar vacíos.");
                return;
            }

            // Validar prioridad
            let prioridadLimpia = nuevaPrioridad.trim();
            if (!["Baja", "Media", "Alta"].includes(prioridadLimpia)) {
                alert("Prioridad no válida. Debe ser exactamente: Baja, Media o Alta.");
                return;
            }

            // Validar estado
            let estatusLimpio = nuevoEstatus.toLowerCase().trim();
            if (!["pendiente", "en progreso", "completado"].includes(estatusLimpio)) {
                alert("Estado no válido. Debe ser: pendiente, en progreso o completado.");
                return;
            }

            // Actualizamos los datos del objeto conservando intacto su ID original (acts.id)
            acts.titulo = nuevoTitulo.trim();
            acts.materia = nuevaMateria.trim();
            acts.descripcion = nuevaDescripcion.trim();
            acts.fecha = nuevaFecha.trim();
            acts.prioridad = prioridadLimpia;
            acts.Estatus = estatusLimpio;

            guardar();
            pintar();
        });

       contenedorBotones.querySelector(".btn-eliminar").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
        let indexReal = actividad.findIndex(item => item.id === acts.id);
        if (indexReal !== -1) {
            actividad.splice(indexReal, 1);
            guardar();
            pintar();
        }
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
