const formulario =document.getElementById("formulario"); 
const nota = document.getElementById("nota");
const resultado = document.getElementById("resultado");
//arriba agarro los elementos del html 
let notaExamen = JSON.parse(localStorage.getItem ("notaExamen")) || [];
//se crea la funcion para imprimir
function print (){
resultado.innerHTML = "";
notaExamen.forEach(function(texto,indice){
resultado.innerHTML += `
<p>${texto}</p>
<button onclick = "eliminar (${indice})">Eliminar</button>
<hr>
`;
});

}

formulario.addEventListener("submit",function (e){
e.preventDefault();
notaExamen.push(nota.value);

localStorage.setItem("notaExamen",JSON.stringify(notaExamen));
nota.value = "";
print();
});
//aqui esta la funcion de eliminar dependiendo el indice
function eliminar (indice){
notaExamen.splice(indice,1);
localStorage.setItem("notaExamen",JSON.stringify(notaExamen));
print();

}

print();    