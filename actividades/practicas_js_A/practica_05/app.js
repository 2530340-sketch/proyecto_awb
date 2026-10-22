// Cada nota es un objeto con titulo, contenido y fecha
// Se recupera el arreglo al cargar el script o se comienza con una lista vacia

let notas = JSON.parse(localStorage.getItem("notasRapidas") || "[]");

// Referencias al formulario y al listado de notas
let contenedor = document.querySelector("#notas");
let formulario = document.querySelector("#formulario");
let campoTitulo = formulario.elements.titulo;
let campoContenido = formulario.elements.contenido;
let botonGuardar = document.querySelector("#guardarNota");
let botonCancelar = document.querySelector("#cancelarEdicion");
let estado = document.querySelector("#estado");

// Mantiene la referencia a la nota activa en edicion
let notaEdicion = null;


// Guarda las notas en localStorage
function guardar() {
    localStorage.setItem("notasRapidas", JSON.stringify(notas));
}


// Muestra las notas en la pantalla
function pintar() {

    // Vacia la lista
    contenedor.replaceChildren();

    // Ordena las notas de la mas nueva a la mas antigua
    [...notas]
        .sort((a, b) => b.fecha - a.fecha)
        .forEach(nota => {

            // Crear elementos
            let tarjeta = document.createElement("article");
            let titulo = document.createElement("h2");
            let contenido = document.createElement("p");
            let fecha = document.createElement("small");
            let editar = document.createElement("button");
            let borrar = document.createElement("button");

            // Clase de la tarjeta
            tarjeta.className = "nota";

            // Mostrar informacion
            titulo.textContent = nota.titulo;
            contenido.textContent = nota.contenido;
            // Convertir fecha a formato legible
            fecha.textContent = new Date(nota.fecha).toLocaleString("es-MX");

            // Boton editar
            editar.type = "button";
            editar.className = "editar";
            editar.textContent = "Editar";
            editar.addEventListener("click", () => {

                // Cargar los datos de la nota
                notaEdicion = nota;
                campoTitulo.value = nota.titulo;
                campoContenido.value = nota.contenido;
                botonGuardar.textContent = "Guardar Cambios";
                botonCancelar.hidden = false;
                campoTitulo.focus();
            });

            // Boton borrar
            borrar.type = "button";
            borrar.textContent = "Eliminar";
            borrar.addEventListener("click", () => {
                // Eliminar la nota
                notas.splice(notas.indexOf(nota), 1);
                // Si estabamos editando esa nota
                if (notaEdicion === nota) {
                    cancelarEdicion();
                }
                // Guardar y actualizar pantalla
                guardar();
                pintar();
                estado.textContent = "Nota eliminada";
            });
            // Agregar elementos a la tarjeta
            tarjeta.append(
                titulo,
                contenido,
                fecha,
                editar,
                borrar
            );

            // Agregar tarjeta al contenedor
            contenedor.appendChild(tarjeta);
        });
}


// Cancelar edicion
function cancelarEdicion() {
    notaEdicion = null;
    formulario.reset();
    botonGuardar.textContent = "Guardar Nota";
    botonCancelar.hidden = true;
}


// Guardar formulario
formulario.addEventListener("submit", (evento) => {
    // Evita que la pagina se recargue
    evento.preventDefault();
    // Obtener valores
    let titulo = campoTitulo.value.trim();
    let contenido = campoContenido.value.trim();

    // No permitir campos vacios
    if (!titulo || !contenido) {
        estado.textContent = "Completa todos los campos";
        return;
    }


    // Si estamos editando
    if (notaEdicion) {
        notaEdicion.titulo = titulo;
        notaEdicion.contenido = contenido;
        notaEdicion.fecha = Date.now();
        cancelarEdicion();
        estado.textContent = "Nota actualizada";
    } else {
        // Crear una nota nueva
        notas.push({
            titulo: titulo,
            contenido: contenido,
            fecha: Date.now()
        });
        formulario.reset();
        estado.textContent = "Nota guardada";
    }


    // Guardar y actualizar la pantalla
    guardar();
    pintar();
});


// Boton cancelar
botonCancelar.addEventListener("click", cancelarEdicion);
// Mostrar las notas al cargar la pagina
pintar();