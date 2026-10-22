const formulario = document.querySelector("#formEncuesta");
const resultado = document.querySelector("#resultado");
const clave = "encuestaCurso";

//Agrega una linea "Etiqueta: valor" al resultado, el valor se escribe con textContent
function agregarLinea(etiqueta, valor) {
    const parrafo = document.createElement("p");
    const fuerte = document.createElement("strong");

    fuerte.textContent = etiqueta + ": ";
    parrafo.append(fuerte, valor);
    resultado.append(parrafo);
}

//Muestra cada punto elegido de la encuesta
function mostrarResultado(datos) {
    resultado.replaceChildren();
    agregarLinea("Nombre", datos.nombre);
    agregarLinea("Grupo", datos.grupo);
    agregarLinea("Tema de interes", datos.tema);
    agregarLinea("Calificacion", datos.calificacion);
    agregarLinea("Comentarios", datos.comentarios || "Sin comentarios");
}

//Rellena el formulario con la encuesta guardada
function cargar() {
    const guardada = localStorage.getItem(clave);
    if (!guardada) {
        return;
    }
    const datos = JSON.parse(guardada);
    Object.entries(datos).forEach(([campo, valor]) => {
        if (formulario.elements[campo]) {
            formulario.elements[campo].value = valor;
        }
    });
    mostrarResultado(datos);
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    //Los campos con required los valida el navegador
    const datos = Object.fromEntries(new FormData(formulario));
    datos.nombre = datos.nombre.trim();
    datos.grupo = datos.grupo.trim();
    datos.comentarios = datos.comentarios.trim();

    //Guarda la encuesta en localStorage como JSON y muestra el resultado
    localStorage.setItem(clave, JSON.stringify(datos));
    mostrarResultado(datos);
});

cargar();
