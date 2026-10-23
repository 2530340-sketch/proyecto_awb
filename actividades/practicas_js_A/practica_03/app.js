<<<<<<< HEAD
//la agenda almacena contactos completos y evita correos duplicados
let contactos = JSON.parse(localStorage.getItem('agendaContactos')) || [];
let formulario = document.querySelector('#formulario');

function guardar() {
    //persiste la coleccion completa de contactos en el localStorage
    localStorage.setItem('agendaContactos', JSON.stringify(contactos));
}

function pintar() {
    //filtra por la busqueda y reconstruye los resultados visibles
    let consulta = document.querySelector('#buscar').value.toLowerCase();
    let lista = document.querySelector('#lista');
    lista.replaceChildren();

    contactos
        .filter((contacto) =>
            JSON.stringify(contacto).toLowerCase().includes(consulta)
        )
        .forEach((contacto) => {
            let elemento = document.createElement('article');
            elemento.className = 'contacto';
            elemento.innerHTML = `<span><b></b><small></small></span><button>Eliminar</button>`;
            elemento.querySelector('b').textContent =
                `${contacto.nombre} · ${contacto.categoria}`;
            elemento.querySelector('small').textContent =
                `${contacto.telefono} · ${contacto.correo}`;
            elemento.querySelector('button').addEventListener('click', () => {
                //elimina el contacto seleccionado
                contactos.splice(contactos.indexOf(contacto), 1);
                guardar();
                pintar();
            });
            lista.appendChild(elemento);
        });
}

formulario.addEventListener('submit', (evento) => {
    //agrega un contacto solamente si el correo no existe
    evento.preventDefault();
    let contacto = Object.fromEntries(new FormData(formulario));
    if (contactos.some(item => item.correo === contacto.correo)) return;
    contactos.push(contacto);
    guardar();
    formulario.reset();
    pintar();
});

document.querySelector('#buscar').addEventListener('input', pintar);
pintar();
=======
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
>>>>>>> 2e21f45741cf24cf0c741cc3e4a74820742a104d
