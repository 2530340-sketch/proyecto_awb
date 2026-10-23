<<<<<<< HEAD
const formulario = document.querySelector('#formulario-pago');
const contenedorResultado = document.querySelector('#resultado');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const empleado = document.querySelector('#empleado').value.trim();
  const horas = Number(document.querySelector('#horas').value);
  const pago_hora = Number(document.querySelector('#pago_hora').value);

  const pagoSubtotal = horas * pago_hora;

  const horasNormales = Math.min(horas, 40);
  const horasExtra = Math.max(horas - 40, 0);

  const pagoNormal = horasNormales * pago_hora;
  const pagoExtra = horasExtra * pago_hora * 1.5;
  const pagoTotal = pagoNormal + pagoExtra;


  contenedorResultado.innerHTML = `
    <strong>Empleado:</strong> ${empleado}<br>
    <strong>Horas:</strong> $${horas}<br>
    <strong>Total a pagar:</strong> $${pagoTotal.toFixed(2)}
  `;
});
=======
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
>>>>>>> 2e21f45741cf24cf0c741cc3e4a74820742a104d
