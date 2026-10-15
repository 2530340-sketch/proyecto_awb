let actividad = JSON.parse(localStorage.getItem("actividadesAcademicas")) || [];



function guardar() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividad));
}

document.querySelector("#formulario").addEventListener("submit",(evento) => {

    evento.preventDefault();

        let datoss = new FormData(evento.target);

    let actividadA = Object.fromEntries(datoss);

    actividad.push(actividadA);

    guardar();

    evento.target.reset();

    pintar();

});


function pintar() {
    let cont = document.querySelector("#resultado2");
    
    cont.replaceChildren();
    //ordena la actividad de la mas nueva a la mas vieja 
    [...actividad]
    .sort((a, b) => b.fecha - a.fecha)
    .forEach((acts) => {
    
        let titulo = document.createElement("h2");
        titulo.textContent = acts.titulo;

         let materia = document.createElement("p");
        materia.textContent = acts.materia;

         let date = document.createElement("p");
        date.textContent = acts.fecha;

         let descripcion = document.createElement("p");
        descripcion.textContent = acts.descripcion;

         let prioridad = document.createElement("p");
        prioridad.textContent = acts.prioridad;

         let estado = document.createElement("p");
        estado.textContent = acts.Estatus;

         let estadoo = document.createElement("p");
        estadoo.textContent = acts.Estatus2;

        cont.append(titulo);
        cont.append(materia);
        cont.append(date);
        cont.append(descripcion);
        cont.append(prioridad);
        cont.append(estado);
        cont.append(estadoo);
    



    });


}
    pintar();
