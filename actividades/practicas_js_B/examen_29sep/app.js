let formulario = document.querySelector("#formulario");
let resultado = document.querySelector("#res");
let btnLimpiar = document.querySelector("#btn-limpiar");

formulario.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Limpiar errores y resumen previo
    limpiarErrores();
    resultado.innerHTML = "";

    // Leer valores
    let nombre = document.querySelector("#nombre").value.trim();
    let correo = document.querySelector("#correo").value.trim();
    let telefono = document.querySelector("#telefono").value.trim();
    let curso = document.querySelector("#curso").value;
    let modalidad = document.querySelector("#modalidad").value;
    let tieneCredencial = document.querySelector("#credencial").checked;
    let aceptoTerminos = document.querySelector("#terminos").checked;

    let esValido = true;

    // --- VALIDACIONES SIMPLES ---
    if (nombre === "") {
        document.querySelector("#error-nombre").textContent = "Nombre obligatorio";
        esValido = false;
    }

    if (correo === "" || !correo.includes("@")) {
        document.querySelector("#error-correo").textContent = "Correo no válido";
        esValido = false;
    }

    if (telefono.length !== 10 || isNaN(telefono)) {
        document.querySelector("#error-telefono").textContent = "Debe ser de 10 números";
        esValido = false;
    }

    if (curso === "") {
        document.querySelector("#error-curso").textContent = "Selecciona un curso";
        esValido = false;
    }

    if (modalidad === "") {
        document.querySelector("#error-modalidad").textContent = "Selecciona modalidad";
        esValido = false;
    }

    if (!aceptoTerminos) {
        document.querySelector("#error-terminos").textContent = "Acepta los términos";
        esValido = false;
    }

    // Si hubo algún error, se detiene
    if (!esValido) {
        return;
    }

    // --- CÁLCULOS ---
    let precioCurso = 0;
    if (curso === "Desarrollo Web") precioCurso = 1200;
    if (curso === "JavaScript") precioCurso = 1500;
    if (curso === "Bases de Datos") precioCurso = 1800;

    let recargo = 0;
    if (modalidad === "presencial") recargo = 300;

    let cuota = 200;

    let descuento = 0;
    if (tieneCredencial) descuento = precioCurso * 0.10;

    let total = precioCurso + recargo + cuota - descuento;

    // --- MOSTRAR RESUMEN ---
    resultado.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Curso:</strong> ${curso}</p>
        <p><strong>Modalidad:</strong> ${modalidad}</p>
        <p><strong>Precio Curso:</strong> $${precioCurso}</p>
        <p><strong>Recargo Presencial:</strong> $${recargo}</p>
        <p><strong>Descuento Credencial:</strong> -$${descuento}</p>
        <p><strong>Cuota de Inscripción:</strong> $${cuota}</p>
        <h3>Total a Pagar: $${total} MXN</h3>
    `;
});

// Botón Limpiar
btnLimpiar.addEventListener("click", function() {
    formulario.reset();
    limpiarErrores();
    resultado.innerHTML = "";
});

// Función para borrar mensajes de error
function limpiarErrores() {
    let errores = document.querySelectorAll(".error");
    for (let i = 0; i < errores.length; i++) {
        errores[i].textContent = "";
    }
}