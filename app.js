let actividad = JSON.parse(localStorage.getItem("actividadesAcademicas")) || [];

function guardar() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividad));
}



// ------------------------------------------
// LOGICA PARA LA PRACTICA 5 (Notas Rápidas)
// ------------------------------------------

function cargarPractica5(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    // 1. Inyectamos la estructura HTML usando tus estilos
    contenedorPrincipal.innerHTML = `
        <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
            <h2>Práctica 5 - Notas Rápidas (${integrante.toUpperCase()})</h2>
            <form id="form-p5-${integrante}" style="margin-top: 15px;">
                <input type="text" name="titulo" placeholder="Título de la nota" required style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                <textarea name="contenido" placeholder="Contenido de la nota" required style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink); resize:vertical; height:70px;"></textarea>
                <div style="display: flex; gap: 10px;">
                    <button id="btnGuardar-${integrante}" type="submit" style="background:var(--primary-pink); color:white; border:none; padding:10px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">Guardar Nota</button>
                    <button id="btnCancelar-${integrante}" type="button" hidden style="background:#e0e0e0; color:#333; border:none; padding:10px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">Cancelar Edición</button>
                </div>
            </form>
            <section id="notas-${integrante}" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;"></section>
            <p id="estado-${integrante}" style="margin-top: 10px; font-weight: 600; color: var(--primary-pink);"></p>
        </div>
    `;

    // 2. Inicializamos la lógica de las notas para el integrante seleccionado
    iniciarLogicaP5(integrante);
}

function iniciarLogicaP5(integrante) {
    const claveStorage = `p5_notas_${integrante}`;
    let notas = JSON.parse(localStorage.getItem(claveStorage) || "[]");

    const contenedor = document.querySelector(`#notas-${integrante}`);
    const formulario = document.querySelector(`#form-p5-${integrante}`);
    const campoTitulo = formulario.elements.titulo;
    const campoContenido = formulario.elements.contenido;
    const botonGuardar = document.querySelector(`#btnGuardar-${integrante}`);
    const botonCancelar = document.querySelector(`#btnCancelar-${integrante}`);
    const estado = document.querySelector(`#estado-${integrante}`);
    let notaEdicion = null;

    function guardar() {
        localStorage.setItem(claveStorage, JSON.stringify(notas));
    }

    function pintarNotas() {
        contenedor.replaceChildren();
        [...notas].sort((a, b) => b.fecha - a.fecha).forEach(nota => {
            let tarjeta = document.createElement("article");
            tarjeta.className = "nota-card";

            let titulo = document.createElement("h2");
            titulo.textContent = nota.titulo;

            let contenido = document.createElement("p");
            contenido.textContent = nota.contenido;

            let fecha = document.createElement("small");
            fecha.textContent = new Date(nota.fecha).toLocaleString("es-MX");
            fecha.style.color = "#777";

            let contenedorBotones = document.createElement("div");
            contenedorBotones.className = "botones-tarjeta";
            contenedorBotones.innerHTML = `<button class="btn-editar">Editar</button><button class="btn-eliminar">Eliminar</button>`;

            // Botón Editar
            contenedorBotones.querySelector(".btn-editar").addEventListener("click", () => {
                notaEdicion = nota;
                campoTitulo.value = nota.titulo;
                campoContenido.value = nota.contenido;
                botonGuardar.textContent = "Guardar Cambios";
                botonCancelar.hidden = false;
                campoTitulo.focus();
            });

            // Botón Eliminar
            contenedorBotones.querySelector(".btn-eliminar").addEventListener("click", () => {
                notas.splice(notas.indexOf(nota), 1);
                if (notaEdicion === nota) cancelarEdicion();
                guardar();
                pintarNotas();
                estado.textContent = "Nota eliminada";
            });

            tarjeta.append(titulo, contenido, fecha, contenedorBotones);
            contenedor.appendChild(tarjeta);
        });
    }

    function cancelarEdicion() {
        notaEdicion = null;
        formulario.reset();
        botonGuardar.textContent = "Guardar Nota";
        botonCancelar.hidden = true;
    }

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let titulo = campoTitulo.value.trim();
        let contenido = campoContenido.value.trim();

        if (!titulo || !contenido) {
            estado.textContent = "Completa todos los campos";
            return;
        }

        if (notaEdicion) {
            notaEdicion.titulo = titulo;
            notaEdicion.contenido = contenido;
            notaEdicion.fecha = Date.now();
            cancelarEdicion();
            estado.textContent = "Nota actualizada";
        } else {
            notas.push({ titulo, contenido, fecha: Date.now() });
            formulario.reset();
            estado.textContent = "Nota guardada";
        }
        guardar();
        pintarNotas();
    });

    botonCancelar.addEventListener("click", cancelarEdicion);
    pintarNotas();
}

// ------------------------------------------------------
// logica para la practica 6 (preferencias de usuario)
// ------------------------------------------------------

function cargarPractica6(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    // inyectamos la estructura html respetando el diseno
    contenedorPrincipal.innerHTML = `
        <div id="panel-p6-${integrante}" class="nota-card tema-claro fuente-normal" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px; transition: all 0.3s ease;">
            <p style="color: var(--primary-pink); font-weight: 800; margin-bottom: 5px;">Guardar preferencias de usuario</p>
            <h2>Práctica 6 - (${integrante.toUpperCase()})</h2>
            
            <form id="form-p6-${integrante}" style="margin-top: 15px; display: grid; gap: 10px; max-width: 600px;">
                <input type="text" name="nombre" placeholder="Nombre" required style="padding:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                
                <select name="tema" required style="padding:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                </select>
                
                <select name="fuente" required style="padding:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                    <option value="pequena">Pequeña</option>
                    <option value="normal" selected>Normal</option>
                    <option value="grande">Grande</option>
                </select>
                
                <div style="display: flex; gap: 10px; margin-top: 5px;">
                    <button type="submit" style="background:var(--primary-pink); color:white; border:none; padding:10px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">Guardar Preferencias</button>
                    <button type="button" id="eliminar-p6-${integrante}" style="background:#e0e0e0; color:#333; border:none; padding:10px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">Eliminar Preferencias</button>
                </div>
            </form>
            
            <section id="mensaje-p6-${integrante}" style="margin-top: 15px; font-weight: bold; color: var(--primary-pink);"></section>
        </div>
    `;

    // inicializamos la logica de las preferencias
    iniciarLogicaP6(integrante);
}

function iniciarLogicaP6(integrante) {
    const claveStorage = `p6_preferencias_${integrante}`;
    const formulario = document.querySelector(`#form-p6-${integrante}`);
    const btnEliminar = document.querySelector(`#eliminar-p6-${integrante}`);
    const panel = document.querySelector(`#panel-p6-${integrante}`);
    const seccionMensaje = document.querySelector(`#mensaje-p6-${integrante}`);

    // aplica estilos de tema y tamano de fuente
    function aplicarEstilos(tema, fuente) {
        // fondo y texto segun el tema
        if (tema === "oscuro") {
            panel.style.backgroundColor = "#1e1e1e";
            panel.style.color = "#f4f4f9";
        } else {
            panel.style.backgroundColor = "var(--white)";
            panel.style.color = "var(--text-color)";
        }

        // tamano de fuente
        if (fuente === "pequena") {
            panel.style.fontSize = "13px";
        } else if (fuente === "grande") {
            panel.style.fontSize = "20px";
        } else {
            panel.style.fontSize = "16px";
        }
    }

    // recupera y carga datos guardados
    function reestablecer() {
        const datosGuardados = localStorage.getItem(claveStorage);

        if (datosGuardados) {
            const preferencias = JSON.parse(datosGuardados);

            formulario.elements['nombre'].value = preferencias.nombre || "";
            formulario.elements['tema'].value = preferencias.tema || "claro";
            formulario.elements['fuente'].value = preferencias.fuente || "normal";

            aplicarEstilos(preferencias.tema, preferencias.fuente);
            seccionMensaje.textContent = `Bienvenido, ${preferencias.nombre}`;
        }
    }

    // guardar preferencias en localstorage
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const preferencias = {
            nombre: formulario.elements['nombre'].value.trim(),
            tema: formulario.elements['tema'].value,
            fuente: formulario.elements['fuente'].value
        };

        localStorage.setItem(claveStorage, JSON.stringify(preferencias));
        aplicarEstilos(preferencias.tema, preferencias.fuente);
        seccionMensaje.textContent = `Bienvenido, ${preferencias.nombre}`;
    });

    // eliminar preferencias de localstorage
    btnEliminar.addEventListener("click", function() {
        localStorage.removeItem(claveStorage);
        formulario.reset();
        aplicarEstilos("claro", "normal");
        seccionMensaje.textContent = "Preferencias eliminadas";
    });

    // reestablecer estado al cargar la vista
    reestablecer();
}


// ----------------------------------------------
// logica para la practica 7 (carrito de compras)
// ----------------------------------------------

function cargarPractica7(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    // inyectamos la estructura html respetando el diseno y usando las clases existentes
    contenedorPrincipal.innerHTML = `
        <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
            <p class="eyebrow" style="color: var(--primary-pink); font-weight: 800;">practica no. 7</p>
            <h2>Carrito de compras - (${integrante.toUpperCase()})</h2>
            <p id="estado-p7-${integrante}" style="margin-top: 5px; font-weight: 600; color: #555;"></p>
            
            <section id="productos-p7-${integrante}" style="display: grid; gap: 15px; margin-top: 15px;">
                <h2 id="total-p7-${integrante}" style="font-size: 1.2rem; color: var(--primary-pink); margin-top: 10px;"></h2>
                <button type="button" id="vaciar-p7-${integrante}" class="btn-eliminar" style="max-width: 200px; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;">Vaciar carrito</button>
            </section>
        </div>
    `;

    // iniciamos la logica del carrito para el integrante seleccionado
    iniciarLogicaP7(integrante);
}

function iniciarLogicaP7(integrante) {
    const claveStorage = `carritoVersionado_${integrante}`;

    // catalogo de productos fijo
    const productos = [
        { id: 1, nombre: "Libro JS", precio: 450 },
        { id: 2, nombre: "Ebook css", precio: 400 },
        { id: 3, nombre: "Libro HTML", precio: 200 }
    ];

    // se intenta leer el formato guardado y se crea uno nuevo si hay falla
    let carrito;
    try {
        carrito = JSON.parse(localStorage.getItem(claveStorage)) || {
            version: 1,
            productos: [],
            actualizado: Date.now()
        };
    } catch {
        carrito = {
            version: 1,
            productos: [],
            actualizado: Date.now()
        };
    }

    // verificar que los datos antiguos tengan estructura de la version 1
    if (!carrito.version) {
        carrito = {
            version: 1,
            productos: carrito.productos || [],
            actualizado: Date.now()
        };
    }

    const contenedor = document.querySelector(`#productos-p7-${integrante}`);
    const totalElemento = document.querySelector(`#total-p7-${integrante}`);
    const estadoElemento = document.querySelector(`#estado-p7-${integrante}`);
    const botonVaciar = document.querySelector(`#vaciar-p7-${integrante}`);

    // guardar
    function guardar() {
        carrito.actualizado = Date.now();
        localStorage.setItem(claveStorage, JSON.stringify(carrito));
    }

    // mostrar total
    function mostrarTotal() {
        let total = carrito.productos.reduce(
            (suma, item) => suma + item.precio * item.cantidad,
            0
        );

        totalElemento.textContent = `Total: $${total}`;
        estadoElemento.textContent = `Versión ${carrito.version} - ${carrito.productos.reduce((acc, p) => acc + p.cantidad, 0)} productos en total`;
    }

    // pintar
    function pintar() {
        // eliminamos tarjetas anteriores de productos si ya existian para no duplicar
        contenedor.querySelectorAll(".producto-item").forEach(el => el.remove());

        productos.forEach((producto) => {
            let item = document.createElement("article");
            item.className = "producto producto-item";
            item.style.background = "var(--pale-pink)";
            item.style.padding = "12px";
            item.style.borderRadius = "8px";
            item.style.border = "1px solid var(--gray-border)";

            item.innerHTML = `
                <h3 style="font-size: 1.1rem; color: var(--text-color);">${producto.nombre}</h3>
                <p style="margin: 5px 0; color: #666;">$${producto.precio}</p>
                <button class="btn-editar" style="padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 600;">Agregar</button>
            `;

            item.querySelector("button").addEventListener("click", () => {
                let existente = carrito.productos.find(
                    (p) => p.id === producto.id
                );

                existente
                    ? existente.cantidad++
                    : carrito.productos.push({
                        ...producto,
                        cantidad: 1
                    });

                guardar();
                mostrarTotal();
            });

            // insertamos antes del titulo del total para mantener el orden visual
            contenedor.insertBefore(item, totalElemento);
        });

        mostrarTotal();
    }

    // vaciar carrito
    botonVaciar.addEventListener("click", () => {
        carrito.productos = [];
        guardar();
        mostrarTotal();
    });

    // iniciar
    pintar();
}





//agregar actividades (video)
document.querySelector("#formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();

    let datoss = new FormData(evento.target);
    let actividadA = Object.fromEntries(datoss);
    actividadA.id = Date.now(); 
    actividad.push(actividadA);
    guardar();
    evento.target.reset();
    pintar();
});


// tomamos los elementos del formulario de busqueda
const inputBuscar = document.querySelector("#buscar");
const selectEstatus2 = document.querySelector('[name="Estatus2"]');
const selectPrioridad2 = document.querySelector('[name="prioridad2"]');


//escuchan los eventos para actualizar la vista en tiempo real
inputBuscar.addEventListener("input", pintar);
selectEstatus2.addEventListener("change", pintar);
selectPrioridad2.addEventListener("change", pintar);

function pintar() {

    let totalPendientes = actividad.filter(a => a.Estatus === "pendiente").length;
    let totalEnProgreso = actividad.filter(a => a.Estatus === "en progreso").length;
    let totalCompletadas = actividad.filter(a => a.Estatus === "completado").length;

    let divResultado = document.querySelector("#resultado");
    divResultado.innerHTML = `
        <div class="tarjeta-indicador">
            <span class="titulo-indicador">Pendientes</span>
            <span class="valor-indicador">${totalPendientes}</span>
        </div>
        <div class="tarjeta-indicador">
            <span class="titulo-indicador">En Progreso</span>
            <span class="valor-indicador">${totalEnProgreso}</span>
        </div>
        <div class="tarjeta-indicador">
            <span class="titulo-indicador">Completadas</span>
            <span class="valor-indicador">${totalCompletadas}</span>
        </div>
    `;


    //filtros (video)
    let cont = document.querySelector("#resultado2");
    cont.replaceChildren();

    let textoBusqueda = inputBuscar.value.toLowerCase().trim();
    let estatusFiltro = selectEstatus2.value;
    let prioridadFiltro = selectPrioridad2.value;

    let actividadesFiltradas = actividad.filter(acts => {
        let coincideTexto = acts.titulo.toLowerCase().includes(textoBusqueda) || 
                            acts.materia.toLowerCase().includes(textoBusqueda);
        let coincideEstatus = estatusFiltro === "" || acts.Estatus === estatusFiltro;
        let coincidePrioridad = prioridadFiltro === "" || acts.prioridad === prioridadFiltro;
        return coincideTexto && coincideEstatus && coincidePrioridad;
    });

    [...actividadesFiltradas]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .forEach((acts) => {
         let indiceReal = actividad.indexOf(acts);
         let tarjeta = document.createElement("div");
         tarjeta.classList.add("nota-card");

         let titulo = document.createElement("h2");
         titulo.textContent = acts.titulo;
         
         let materia = document.createElement("p");
         materia.textContent = "Materia: " + acts.materia;

         let date = document.createElement("p");
         date.textContent = "Fecha: " + acts.fecha;
         
         let descripcion = document.createElement("p");
         descripcion.textContent = "Descripción: " + acts.descripcion;

         let prioridad = document.createElement("p");
         prioridad.textContent = "Prioridad: " + acts.prioridad;

         let estado = document.createElement("p");
         estado.textContent = "Estado: " + acts.Estatus;

        let contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("botones-tarjeta");
        contenedorBotones.innerHTML = `<button class="btn-editar">Editar</button><button class="btn-eliminar">Eliminar</button>`;

        // Boton Editar toda la informacion  (video)
        contenedorBotones.querySelector(".btn-editar").addEventListener("click", () => {
            let nuevoTitulo = prompt("Edita el título:", acts.titulo);
            if (nuevoTitulo === null) return;

            let nuevaMateria = prompt("Edita la materia:", acts.materia);
            if (nuevaMateria === null) return;

            let nuevaDescripcion = prompt("Edita la descripción:", acts.descripcion);
            if (nuevaDescripcion === null) return;

            let nuevaFecha = prompt("Edita la fecha (AAAA-MM-DD):", acts.fecha);
            if (nuevaFecha === null) return;

            let nuevaPrioridad = prompt("Edita la prioridad (Baja, Media, Alta):", acts.prioridad);
            if (nuevaPrioridad === null) return;

            let nuevoEstatus = prompt("Edita el estado (pendiente, en progreso, completado):", acts.Estatus);
            if (nuevoEstatus === null) return;

            // Validar campos obligatorios vacios
            if (nuevoTitulo.trim() === "" || nuevaMateria.trim() === "" || nuevaFecha.trim() === "") {
                alert("El título, la materia y la fecha son obligatorios y no pueden estar vacíos.");
                return;
            }

            // Validar prioridad
            let prioridadLimpia = nuevaPrioridad.trim();
            if (!["Baja", "Media", "Alta"].includes(prioridadLimpia)) {
                alert("Prioridad no válida. Debe ser exactamente: Baja, Media o Alta.");
                return;
            }

            // Validar estado
            let estatusLimpio = nuevoEstatus.toLowerCase().trim();
            if (!["pendiente", "en progreso", "completado"].includes(estatusLimpio)) {
                alert("Estado no válido. Debe ser: pendiente, en progreso o completado.");
                return;
            }

            // Actualiz los datos del objeto conservando intacto su ID original (acts.id)
            acts.titulo = nuevoTitulo.trim();
            acts.materia = nuevaMateria.trim();
            acts.descripcion = nuevaDescripcion.trim();
            acts.fecha = nuevaFecha.trim();
            acts.prioridad = prioridadLimpia;
            acts.Estatus = estatusLimpio;

            guardar();
            pintar();
        });

        //(video)
       contenedorBotones.querySelector(".btn-eliminar").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
        let indexReal = actividad.findIndex(item => item.id === acts.id);
        if (indexReal !== -1) {
            actividad.splice(indexReal, 1);
            guardar();
            pintar();
        }
    }
});

    tarjeta.append(titulo);
    tarjeta.append(materia);
    tarjeta.append(date);
    tarjeta.append(descripcion);
    tarjeta.append(prioridad);
    tarjeta.append(estado);
    tarjeta.append(contenedorBotones);

    cont.append(tarjeta);
});
}

pintar();
