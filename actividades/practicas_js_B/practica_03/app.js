//La agenda almacena contactos completos y evita correos duplicados.
let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let formulario = document.querySelector("#formulario");

function guardar() {
    //Persiste la coleccion de contactos en el localStorage
    localStorage.setItem("contactos", JSON.stringify(contactos));

}

function pintar(){
    //filtra por la busqueda y reconstruye los resultaodos en la tabla
    let consulta = document.querySelector("#buscar").value.toLowerCase();
    let lista = document.querySelector("#lista");
    lista.replaceChildren();
    contactos.filter(contacto => JSON.stringify(contacto).toLowerCase().includes(consulta)).forEach((contacto, indice) => {
        let elemento = document.createElement("article");
        elemento.className = "contacto";
        elemento.innerHTML = `<span><b></b><small></small></span><button>Eliminar</button>`;
        elemento.querySelector("b").textContent = contacto.nombre + " - " + contacto.categoria + " - ";
        elemento.querySelector("small").textContent = contacto.telefono + " - " + contacto.correo;
        elemento.querySelector("button").addEventListener("click", () => {
            //Elimina el contacto de la coleccion y actualiza la tabla
            contactos.splice(indice, 1);
            guardar();
            pintar();
        });
        lista.appendChild(elemento);
    });
}

formulario.addEventListener("submit", (evento) => {
    //Agrega un contacto solamente si el correo no existe en la coleccion
    evento.preventDefault();
    let contacto = Object.fromEntries(new FormData(formulario));
    if (contactos.some(item => item.correo === contacto.correo)) {
        alert("El correo ya existe en la agenda");
        return;
    }
    contactos.push(contacto);
    guardar();
    formulario.reset();
    pintar();
});

document.querySelector("#buscar").addEventListener("input", pintar);

pintar();