const clave = "aplicacionProyectos";

// Selectores
const btnInicio = document.querySelector('#btnInicio');
const btnProyectos = document.querySelector('#btnProyectos');
const btnAjustes = document.querySelector('#btnAjustes');

const pantallaInicio = document.querySelector("#inicio");
const pantallaProyectos = document.querySelector("#proyectos");
const pantallaAjustes = document.querySelector("#ajustes");

const inputNomProyecto = document.querySelector('#nomProyectos');
const btnGuardarProyecto = document.querySelector('#btnGuardarProyecto');
const contadorProyectos = document.querySelector('#contadorProyectos');
const listaProyectosAjustes = document.querySelector('#listaProyectosAjustes');

let estado = JSON.parse(localStorage.getItem(clave)) || {
  vista: "inicio",
  listaProyectos: []
};

// Asegurar que listaProyectos sea un arreglo
if (!Array.isArray(estado.listaProyectos)) {
  estado.listaProyectos = [];
}

function guardar() {
  localStorage.setItem(clave, JSON.stringify(estado));
}

function ocultarTodas() {
  pantallaInicio.classList.remove('active');
  pantallaProyectos.classList.remove('active');
  pantallaAjustes.classList.remove('active');
}

function cambiarVista(nombreVista) {
  estado.vista = nombreVista;
  guardar();

  ocultarTodas();

  if (nombreVista === 'inicio') {
    pantallaInicio.classList.add('active');
  } else if (nombreVista === 'proyectos') {
    pantallaProyectos.classList.add('active');
  } else if (nombreVista === 'ajustes') {
    pantallaAjustes.classList.add('active');
  }

  renderizar();
}

// Dibujar la interfaz (contador en Inicio y lista en Ajustes)
function renderizar() {
  if (contadorProyectos) {
    contadorProyectos.textContent = estado.listaProyectos.length;
  }

  if (listaProyectosAjustes) {
    listaProyectosAjustes.innerHTML = '';

    if (estado.listaProyectos.length === 0) {
      listaProyectosAjustes.innerHTML = '<p>No hay proyectos guardados.</p>';
    } else {
      estado.listaProyectos.forEach((proyecto, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-proyecto');

        tarjeta.innerHTML = `
          <p><strong>${proyecto}</strong></p>
          <button type="button" class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;

        listaProyectosAjustes.appendChild(tarjeta);
      });

      // Asignar clic a cada botón eliminar
      const botonesEliminar = listaProyectosAjustes.querySelectorAll('.btn-eliminar');
      botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          eliminarProyecto(idx);
        });
      });
    }
  }
}

// Guardar nuevo proyecto
if (btnGuardarProyecto) {
  btnGuardarProyecto.addEventListener('click', () => {
    const nombre = inputNomProyecto.value.trim();

    if (nombre !== "") {
      estado.listaProyectos.push(nombre);
      guardar();
      inputNomProyecto.value = "";
      alert("¡Proyecto guardado!");
      renderizar();
    } else {
      alert("Por favor escribe un nombre para el proyecto.");
    }
  });
}

// Eliminar proyecto por su índice
function eliminarProyecto(index) {
  estado.listaProyectos.splice(index, 1);
  guardar();
  renderizar();
}

// Navegación
if (btnInicio) btnInicio.addEventListener('click', () => cambiarVista('inicio'));
if (btnProyectos) btnProyectos.addEventListener('click', () => cambiarVista('proyectos'));
if (btnAjustes) btnAjustes.addEventListener('click', () => cambiarVista('ajustes'));

// Carga inicial
cambiarVista(estado.vista);