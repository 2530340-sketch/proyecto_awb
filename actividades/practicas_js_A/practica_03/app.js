// El formulario se guarda como borrador mientras el usuario escribe
let formulario = document.querySelector("#formulario");
let clave = "borradorRegistro";
let estado = document.querySelector("#estado");

function guardar(){

    // Guarda los valores del formulario en local storage
    localStorage.setItem(
        clave,
        JSON.stringify(Object.fromEntries(new FormData(formulario)))
    );

    estado.textContent = "Registro guardado";
}

function cargar(){

    // Rellena los campos con el borrador anterior
    let datos = JSON.parse(localStorage.getItem(clave) || "{}");

    Object.entries(datos).forEach(([campo, valor]) => {

        if(formulario.elements[campo]){
            formulario.elements[campo].value = valor;
        }

    });
}

// Guardar mientras el usuario escribe
formulario.addEventListener("input", () => {
    guardar();
});

formulario.addEventListener("submit", (evento) => {

    // Guarda el registro cuando los valores del HTML son válidos
    evento.preventDefault();

    if(!formulario.checkValidity()){
        formulario.reportValidity();
        return;
    }

    guardar();
    estado.textContent = "Registro confirmado";
});

// Botón para limpiar
document.querySelector("#borrar").addEventListener("click", () => {

    formulario.reset();
    localStorage.removeItem(clave);
    estado.textContent = "Formulario limpiado";

});

// Cargar el borrador cuando se abre la página
cargar();
