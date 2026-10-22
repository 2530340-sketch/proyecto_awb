const formulario = document.querySelector('#formulario-pago');
const contenedorResultado = document.querySelector('#resultado');
const campoEmpleado = document.querySelector('#empleado');
const campoHoras = document.querySelector('#horas');
const campoPagoHora = document.querySelector('#pago_hora');
const clavePago = 'practica9.nomina';

function calcularPago(horas, pagoHora) {
  const horasNormales = Math.min(horas, 40);
  const horasExtra = Math.max(horas - 40, 0);
  return horasNormales * pagoHora + horasExtra * pagoHora * 1.5;
}

function mostrarResultado(empleado, horas, pagoTotal) {
  contenedorResultado.replaceChildren();

  const datos = [
    ['Empleado', empleado],
    ['Horas', horas],
    ['Total a pagar', `$${pagoTotal.toFixed(2)}`]
  ];

  datos.forEach(([etiqueta, valor]) => {
    const linea = document.createElement('p');
    const nombreCampo = document.createElement('strong');
    nombreCampo.textContent = `${etiqueta}: `;
    linea.append(nombreCampo, document.createTextNode(valor));
    contenedorResultado.append(linea);
  });
}

function cargarDatosGuardados() {
  try {
    const guardados = localStorage.getItem(clavePago);
    if (!guardados) return;

    const datos = JSON.parse(guardados);
    if (
      typeof datos.empleado !== 'string' ||
      !Number.isFinite(datos.horas) ||
      !Number.isFinite(datos.pagoHora)
    ) return;

    campoEmpleado.value = datos.empleado;
    campoHoras.value = datos.horas;
    campoPagoHora.value = datos.pagoHora;
    mostrarResultado(datos.empleado, datos.horas, calcularPago(datos.horas, datos.pagoHora));
  } catch {
    contenedorResultado.textContent = 'No se pudieron recuperar los datos guardados.';
  }
}

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const empleado = campoEmpleado.value.trim();
  const horas = Number(campoHoras.value);
  const pagoHora = Number(campoPagoHora.value);
  const pagoTotal = calcularPago(horas, pagoHora);

  try {
    localStorage.setItem(clavePago, JSON.stringify({ empleado, horas, pagoHora }));
  } catch {
    contenedorResultado.textContent = 'No se pudieron guardar los datos en este navegador.';
    return;
  }

  mostrarResultado(empleado, horas, pagoTotal);
});

cargarDatosGuardados();