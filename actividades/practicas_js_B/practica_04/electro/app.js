const formulario = document.querySelector("#formulario_consumoElectrico");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const lecturaAnterior = Number(document.querySelector("#lecturaAnterior").value);
    const lecturaActual = Number(document.querySelector("#lecturaActual").value);

    if (lecturaActual < lecturaAnterior) {
        resultado.innerHTML = `<p style="color: red;"><strong>Error:</strong> La lectura actual no puede ser menor a la lectura anterior.</p>`;
        return; 
    }

    const consumo = lecturaActual - lecturaAnterior;
    let precioPorKwh = 0;

    if (consumo <= 100) {
        precioPorKwh = 1.20;
    } else if (consumo <= 250) {
        precioPorKwh = 1.50;
    } else {
        precioPorKwh = 1.80;
    }

    const totalPagar = consumo * precioPorKwh;

    resultado.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Lectura Actual:</strong> ${lecturaActual} kWh</p>
        <p><strong>Lectura Anterior:</strong> ${lecturaAnterior} kWh</p>
        <p><strong>Consumo Total:</strong> ${consumo} kWh</p>
        <p><strong>Tarifa aplicada:</strong> $${precioPorKwh.toFixed(2)} por kWh</p>
        <p><strong>Total a Pagar:</strong> $${totalPagar.toFixed(2)}</p>
    `;
});