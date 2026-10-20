let nomina = JSON.parse(localStorage.getItem('nominaClientes')) || [];
const formulario = document.querySelector("#formularioNomina");

const resultado = document.querySelector("#resultado");

function guardar() {
    //persiste la coleccion completa de contactos en el localStorage
    localStorage.setItem('nominaClientes', JSON.stringify(nomina));
}


    formulario.addEventListener("submit", function(event){

          event.preventDefault();

        const nombre = document.querySelector("#NombreEmpleado").value;
        const horas = document.querySelector("#horasTrabajadas").value;
        const pago = document.querySelector("#pagoHora").value;

        let extra = 0;
        let  pagototal = 0;
        let mas;
        let sum;
        let total;



        if (horas > 40){

            pagototal = pago * horas;

            extra = horas - 40;
            
            mas = pago * 1.5;

            sum = mas * extra;

            total = pagototal + sum;





        }else {
            pagototal = pago * horas;
            total = pagototal;


        }


        const empleado = {
            nombre: nombre,
            horas: horas,
            horasExtra: extra,
            pagoTotal: total


        };

        nomina.push(empleado);
        guardar();

        resultado.innerHTML =`

         <p>
                <strong>Nombre: </strong>
                ${nombre}   
            </p>
            <p>
                <strong>Horas Normales: </strong>
                ${horas}   
            </p>
            <p>
                <strong>Horas extra: </strong>
                ${extra}   
            </p>
            <p>
                <strong>Pago toal: </strong>
                ${pagototal}   
            </p>



            `;




    })
