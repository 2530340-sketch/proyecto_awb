let actividad = JSON.parse(localStorage.getItem("actividadesAcademicas")) || [];

function guardar() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividad));
}

document.querySelector("#formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();

    let datoss = new FormData(evento.target);
    let actividadA = Object.fromEntries(datoss);

    actividad.push(actividadA);
    guardar();
    evento.target.reset();
    pintar();
});

function pintar() {
    let cont = document.querySelector("#resultado2");
    cont.replaceChildren();
    //ordena la actividad de la mas nueva a la mas vieja 
    [...actividad]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .forEach((acts, indice) => {
        
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

        // contenedor de botones de accion eliminar y editar
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
            actividad.splice(indice, 1);
            guardar();
            pintar();
        });

        // Agregamos todos los elementos dentro de la nota
        tarjeta.append(titulo);
        tarjeta.append(materia);
        tarjeta.append(date);
        tarjeta.append(descripcion);
        tarjeta.append(prioridad);
        tarjeta.append(estado);
        tarjeta.append(contenedorBotones);

        // Agrega la nota completa al contenedor principal
        cont.append(tarjeta);
    });
}

pintar();