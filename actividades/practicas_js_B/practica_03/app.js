function escribir(idContenedor, mensaje) {
    console.log(mensaje);
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.textContent += mensaje + "\n";
    }
}

// Ej. 1.1
let nombre = "Jorge Gabriel Heredia Lara";
let edad = 19;
let carrera = "Ing. en Tecnologías de la Información e Innovación Digital";
let grupo = "4 - 2";
let materia = "Aplicaciones Web";

// 1.2
escribir("ejercicio1", " Variable Nombre: " + nombre);
escribir("ejercicio1", " Variable Edad: " + edad);
escribir("ejercicio1", " Variable Carrera: " + carrera);
escribir("ejercicio1", " Variable Grupo: " + grupo);
escribir("ejercicio1", " Variable Materia: " + materia);

// 1.3
let estaInscrito = true;
escribir("ejercicio1", " ¿Está inscrito?: " + estaInscrito);

// 1.4
edad = 65;
estaInscrito = false;
escribir("ejercicio1", " Variable Edad Modificada: " + edad);
escribir("ejercicio1", " Variable estaInscrito Modificado: " + estaInscrito);


// Ej. 2.1
let num1 = 20;
let num2 = 5;

// 2.2 y 2.3 (Corregido: llevaba dos barras //)
escribir("ejercicio2", " Suma: " + (num1 + num2));
escribir("ejercicio2", " Resta: " + (num1 - num2));
escribir("ejercicio2", " Multiplicación: " + (num1 * num2));
escribir("ejercicio2", " División: " + (num1 / num2));

// 2.4
let num3 = 14;
let num4 = 4;
escribir("ejercicio2", " Suma: " + (num3 + num4));
escribir("ejercicio2", " Resta: " + (num3 - num4));
escribir("ejercicio2", " Multiplicación: " + (num3 * num4));
escribir("ejercicio2", " División: " + (num3 / num4));


// Ej. 3
function evaluarEdad(edadEvaluar) {
    if (edadEvaluar >= 50) {
        return "Tercera edad";
    } else if (edadEvaluar >= 18) {
        return "Mayor de edad";
    } else {
        return "Menor de edad";
    }
}

let miEdad = 19; 
escribir("ejercicio3", "La edad de " + miEdad + " pertenece al grupo de: " + evaluarEdad(miEdad));
escribir("ejercicio3", "La edad de " + edad + " pertenece al grupo de: " + evaluarEdad(edad));