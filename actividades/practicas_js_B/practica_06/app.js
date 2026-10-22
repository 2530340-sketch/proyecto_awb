const formulario = document.querySelector("#formulario");
const botonSubmit = formulario.querySelector("button[type='submit']");
const btnEliminar = document.querySelector("#eliminar");
const panel = document.querySelector(".panel");
const seccionMensaje = document.querySelector("#mensaje");

function pintar(tema, fuente) {
    panel.className = "panel"; 
    
    panel.classList.add(`tema-${tema}`);
    panel.classList.add(`fuente-${fuente}`);
}

function reestablecer() {
    const datosGuardados = localStorage.getItem('preferenciasUsuario');

    if (datosGuardados) {
        const preferencias = JSON.parse(datosGuardados);

        formulario.elements['nombre'].value = preferencias.nombre || "";
        formulario.elements['tema'].value = preferencias.tema || "claro";
        formulario.elements['fuente'].value = preferencias.fuente || "normal";

        pintar(preferencias.tema, preferencias.fuente);

        seccionMensaje.textContent = `Bienvenido, ${preferencias.nombre}`;
    }
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const preferencias = {
        nombre: formulario.elements['nombre'].value.trim(),
        tema: formulario.elements['tema'].value,
        fuente: formulario.elements['fuente'].value
    };

    localStorage.setItem('preferenciasUsuario', JSON.stringify(preferencias));

    pintar(preferencias.tema, preferencias.fuente);

});

btnEliminar.addEventListener("click", function() {
    localStorage.removeItem('preferenciasUsuario');

    formulario.reset();

    pintar("claro", "normal");

});

document.addEventListener("DOMContentLoaded", reestablecer);