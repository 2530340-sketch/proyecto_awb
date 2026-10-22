const formulario = document.querySelector('#formulario-encuesta');
const contenedorResultado = document.querySelector('#resultado');
const campoTema = formulario.querySelector('select[name="tema"]');
const claveEncuesta = 'encuestaCurso';

function mostrarEncuesta(encuesta) {
  contenedorResultado.replaceChildren();

  const titulo = document.createElement('h2');
  titulo.textContent = 'Encuesta guardada';
  contenedorResultado.append(titulo);

  const respuestas = [
    ['Nombre', encuesta.nombre],
    ['Grupo', encuesta.grupo],
    ['Tema favorito', encuesta.tema],
    ['Calificación', `${encuesta.calificacion} de 5`],
    ['Comentario', encuesta.comentario || 'Sin comentario']
  ];

  respuestas.forEach(([etiqueta, respuesta]) => {
    const linea = document.createElement('p');
    const nombreCampo = document.createElement('strong');
    nombreCampo.textContent = `${etiqueta}: `;
    linea.append(nombreCampo, document.createTextNode(respuesta));
    contenedorResultado.append(linea);
  });
}

function cargarEncuesta() {
  const guardada = localStorage.getItem(claveEncuesta);
  if (!guardada) return;

  try {
    const encuesta = JSON.parse(guardada);
    formulario.elements.nombre.value = encuesta.nombre;
    formulario.elements.grupo.value = encuesta.grupo;
    campoTema.value = encuesta.tema;
    formulario.elements.comentario.value = encuesta.comentario;
    formulario.querySelector(`input[name="calificacion"][value="${encuesta.calificacion}"]`).checked = true;
    mostrarEncuesta(encuesta);
  } catch {
    contenedorResultado.textContent = 'No se pudieron leer los datos guardados.';
  }
}

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const datos = new FormData(formulario);
  const encuesta = {
    nombre: datos.get('nombre').trim(),
    grupo: datos.get('grupo').trim(),
    tema: campoTema.value.trim(),
    calificacion: datos.get('calificacion'),
    comentario: datos.get('comentario').trim()
  };

  try {
    localStorage.setItem(claveEncuesta, JSON.stringify(encuesta));
    mostrarEncuesta(encuesta);
  } catch {
    contenedorResultado.textContent = 'No se pudo guardar la encuesta en este navegador.';
  }
});

cargarEncuesta();