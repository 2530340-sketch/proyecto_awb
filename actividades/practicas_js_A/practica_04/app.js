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