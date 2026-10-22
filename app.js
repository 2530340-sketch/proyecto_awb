let actividad = JSON.parse(localStorage.getItem("actividadesAcademicas")) || [];

function guardar() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividad));
}

// ------------------------------------------
// LOGICA PARA LA PRACTICA 3 (Registro)
// ------------------------------------------

function cargarPractica3(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    contenedorPrincipal.innerHTML = `
        <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
            <h2>Formulario de Registro (${integrante.toUpperCase()})</h2>
            <p id="estado-p3-${integrante}" style="color:var(--primary-pink);"></p>
            <form id="form-p3-${integrante}" style="margin-top:15px; display:grid; gap:10px; max-width:600px;">
                <input name="nombre" placeholder="Nombre" required>
                <input name="correo" type="email" placeholder="Correo" required>
                <input name="telefono" type="tel" placeholder="Teléfono" maxlength="10" pattern="[0-9]{10}" title="Escribe 10 dígitos" required>
                <input name="ciudad" placeholder="Ciudad">
                <select name="curso" required>
                    <option value="">Seleccione una opción</option>
                    <option value="Desarrollo web">Desarrollo web</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                </select>
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <button type="submit" class="btn-editar">Confirmar registro</button>
                    <button type="button" id="borrar-p3-${integrante}" class="btn-eliminar">Limpiar</button>
                </div>
            </form>
        </div>
    `;

    iniciarLogicaP3(integrante);
}

function iniciarLogicaP3(integrante) {
    const formulario = document.querySelector(`#form-p3-${integrante}`);
    const clave = `p3_borradorRegistro_${integrante}`;
    const estado = document.querySelector(`#estado-p3-${integrante}`);
    const botonBorrar = document.querySelector(`#borrar-p3-${integrante}`);

    if (!formulario || !estado || !botonBorrar) return;

    function guardar() {
        const datos = Object.fromEntries(new FormData(formulario));
        localStorage.setItem(clave, JSON.stringify(datos));
        estado.textContent = "Borrador guardado";
    }

    function cargar() {
        try {
            const datos = JSON.parse(localStorage.getItem(clave) || "{}");
            Object.entries(datos).forEach(([campo, valor]) => {
                if (formulario.elements[campo]) {
                    formulario.elements[campo].value = valor;
                }
            });
            if (Object.keys(datos).length > 0) {
                estado.textContent = "Se recuperó el borrador guardado";
            }
        } catch (error) {
            estado.textContent = "No se pudieron recuperar los datos guardados";
        }
    }

    // Guarda el borrador mientras se escribe.
    formulario.addEventListener("input", guardar);
    formulario.addEventListener("change", guardar);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }
        guardar();
        estado.textContent = "Registro confirmado y guardado";
    });

    botonBorrar.addEventListener("click", () => {
        formulario.reset();
        localStorage.removeItem(clave);
        estado.textContent = "Formulario limpiado";
    });

    cargar();
}

// ------------------------------------------
// LOGICA PARA LA PRACTICA 4 (Agenda UPV)
// ------------------------------------------

function cargarPractica4(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    contenedorPrincipal.innerHTML = `
        <div class="nota-card" style="grid-column:1 / -1; border-left:5px solid var(--primary-pink); padding:20px;">
            <h2>Agenda UPV (${integrante.toUpperCase()})</h2>
            <form id="form-p4-${integrante}" style="display:grid; gap:10px; max-width:600px;">
                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="tel" name="telefono" placeholder="Teléfono (10 dígitos)" maxlength="10" pattern="[0-9]{10}" title="Escribe 10 dígitos" required>
                <input name="correo" type="email" placeholder="Correo" required>
                <select name="categoria" required>
                    <option value="Familia">Familia</option>
                    <option value="Amigos">Amigos</option>
                    <option value="Trabajo">Trabajo</option>
                </select>
                <button type="submit" class="btn-editar">Guardar contacto</button>
            </form>
            <input id="buscar-p4-${integrante}" placeholder="Buscar contacto" type="search" style="margin-top:15px; width:100%;">
            <p id="estado-p4-${integrante}" style="color:var(--primary-pink);"></p>
            <section id="lista-p4-${integrante}" style="display:grid; gap:10px; margin-top:10px;"></section>
        </div>
    `;

    iniciarLogicaP4(integrante);
}

function iniciarLogicaP4(integrante) {
    const claveStorage = `agendaContactos_${integrante}`;
    const formulario = document.querySelector(`#form-p4-${integrante}`);
    const inputBuscar = document.querySelector(`#buscar-p4-${integrante}`);
    const lista = document.querySelector(`#lista-p4-${integrante}`);
    const estado = document.querySelector(`#estado-p4-${integrante}`);

    if (!formulario || !inputBuscar || !lista || !estado) return;

    let contactos = [];
    try {
        const guardados = JSON.parse(localStorage.getItem(claveStorage) || "[]");
        contactos = Array.isArray(guardados) ? guardados : [];
    } catch (error) {
        contactos = [];
    }

    function guardar() {
        localStorage.setItem(claveStorage, JSON.stringify(contactos));
    }

    function pintar() {
        const consulta = inputBuscar.value.toLowerCase().trim();
        lista.replaceChildren();

        const filtrados = contactos.filter(contacto =>
            `${contacto.nombre} ${contacto.telefono} ${contacto.correo} ${contacto.categoria}`
                .toLowerCase().includes(consulta)
        );

        if (filtrados.length === 0) {
            lista.textContent = consulta ? "No se encontraron contactos." : "Todavía no hay contactos guardados.";
            return;
        }

        filtrados.forEach(contacto => {
            const elemento = document.createElement("article");
            elemento.className = "nota-card";
            elemento.style.padding = "12px";

            const nombre = document.createElement("h3");
            nombre.textContent = `${contacto.nombre} · ${contacto.categoria}`;
            const detalles = document.createElement("p");
            detalles.textContent = `${contacto.telefono} · ${contacto.correo}`;
            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.className = "btn-eliminar";
            botonEliminar.textContent = "Eliminar";

            botonEliminar.addEventListener("click", () => {
                contactos = contactos.filter(item => item.id !== contacto.id);
                guardar();
                pintar();
                estado.textContent = "Contacto eliminado";
            });

            elemento.append(nombre, detalles, botonEliminar);
            lista.appendChild(elemento);
        });
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const contacto = Object.fromEntries(new FormData(formulario));
        contacto.nombre = contacto.nombre.trim();
        contacto.telefono = contacto.telefono.trim();
        contacto.correo = contacto.correo.trim().toLowerCase();
        contacto.id = Date.now();

        if (contactos.some(item => item.correo.toLowerCase() === contacto.correo)) {
            estado.textContent = "Ya existe un contacto con ese correo";
            return;
        }

        contactos.push(contacto);
        guardar();
        formulario.reset();
        estado.textContent = "Contacto guardado";
        pintar();
    });

    inputBuscar.addEventListener("input", pintar);
    pintar();
}


// ------------------------------------------
// LOGICA PARA LA PRACTICA 5 (Notas Rápidas)
// ------------------------------------------

function cargarPractica5(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    // 1. Inyectamos la estructura HTML 
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


// -------------------------------------------------
// logica para la practica 8 (gestor de proyectos)
// -------------------------------------------------

function cargarPractica8(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    if (integrante === 'alberto') {
        // estructura html de la version de alberto
        contenedorPrincipal.innerHTML = `
            <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
                <header style="margin-bottom: 15px;">
                    <p class="eyebrow" style="color: var(--primary-pink); font-weight: 800;">previo a examen</p>
                    <h2>Gestor de proyectos - (ALBERTO)</h2>
                    <nav id="nav-p8-alberto" style="display: flex; gap: 10px; margin-top: 10px;">
                        <button data-vista="inicio" class="btn-editar" style="cursor:pointer; padding:6px 12px; border-radius:4px;">Inicio</button>
                        <button data-vista="proyectos" class="btn-editar" style="cursor:pointer; padding:6px 12px; border-radius:4px;">Proyectos</button>
                        <button data-vista="ajustes" class="btn-editar" style="cursor:pointer; padding:6px 12px; border-radius:4px;">Ajustes</button>
                    </nav>
                </header>
                <section id="app-p8-alberto" style="margin-top: 15px;"></section>
            </div>
        `;
        iniciarLogicaP8Alberto();

    } else if (integrante === 'aneth') {
        // estructura html de la version de aneth
        contenedorPrincipal.innerHTML = `
            <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
                <header style="margin-bottom: 15px;">
                    <p class="eyebrow" style="color: var(--primary-pink); font-weight: 800;">previo a examen</p>
                    <h2>Gestor de proyectos - (ANETH)</h2>
                    <nav style="display: flex; gap: 10px; margin-top: 10px;">
                        <button id="btnInicio-aneth" class="btn-editar" style="cursor:pointer; padding:6px 12px; border-radius:4px;">Inicio</button>
                        <button id="btnProyectos-aneth" class="btn-editar" style="cursor:pointer; padding:6px 12px; border-radius:4px;">Proyectos</button>
                        <button id="btnAjustes-aneth" class="btn-editar" style="cursor:pointer; padding:6px 12px; border-radius:4px;">Ajustes</button>
                    </nav>
                </header>

                <!-- secciones controladas por dinamica de clases -->
                <section id="inicio-aneth" class="seccion-p8" style="display:none; margin-top:15px;">
                    <h3>Resumen</h3>
                    <p><strong>Proyectos: <span id="contadorProyectos-aneth">0</span></strong></p>
                    <p>Aplicación de una sola página con estado persistente.</p>
                </section>

                <section id="proyectos-aneth" class="seccion-p8" style="display:none; margin-top:15px;">
                    <h3>Proyectos</h3>
                    <div style="display:flex; flex-direction:column; gap:10px; max-width:400px;">
                        <label for="nomProyectos-aneth">Nombre del proyecto:</label>
                        <input type="text" id="nomProyectos-aneth" style="padding:8px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                        <button type="button" id="btnGuardarProyecto-aneth" class="btn-editar" style="padding:10px; font-weight:bold; cursor:pointer;">Guardar</button>
                    </div>
                </section>

                <section id="ajustes-aneth" class="seccion-p8" style="display:none; margin-top:15px;">
                    <h3>Ajustes / Lista de Proyectos</h3>
                    <div id="listaProyectosAjustes-aneth" style="display:grid; gap:10px; margin-top:10px;"></div>
                </section>
            </div>
        `;
        iniciarLogicaP8Aneth();
    }
}

// --- logica de alberto adaptada ---
function iniciarLogicaP8Alberto() {
    let proyectos = [];
    let vistaActiva = "inicio";
    const contenedor = document.querySelector("#app-p8-alberto");
    const claveStorage = "aplicacionProyectos_alberto";

    try {
        let datosGuardados = localStorage.getItem(claveStorage);
        if (datosGuardados) {
            let datos = JSON.parse(datosGuardados);
            proyectos = Array.isArray(datos.proyectos) ? datos.proyectos : [];
            vistaActiva = datos.vistaActiva || "inicio";
        }
    } catch (error) {
        proyectos = [];
        vistaActiva = "inicio";
    }

    function guardar() {
        let datos = { proyectos: proyectos, vistaActiva: vistaActiva };
        localStorage.setItem(claveStorage, JSON.stringify(datos));
    }

    function cambiarVista(vista) {
        vistaActiva = vista;
        guardar();
        pintar();
    }

    function pintar() {
        if (!contenedor) return;
        contenedor.replaceChildren();

        if (vistaActiva === "inicio") {
            let titulo = document.createElement("h3");
            let subtitulo = document.createElement("h4");
            let resumen = document.createElement("p");

            titulo.textContent = "Inicio";
            subtitulo.textContent = "Resumen";
            resumen.textContent = `Proyectos guardados: ${proyectos.length}`;

            contenedor.append(titulo, subtitulo, resumen);

        } else if (vistaActiva === "proyectos") {
            let titulo = document.createElement("h3");
            let texto = document.createElement("p");
            let inputNombre = document.createElement("input");
            let inputDescripcion = document.createElement("textarea");
            let selectEstado = document.createElement("select");
            let botonAgregar = document.createElement("button");
            let lista = document.createElement("div");

            titulo.textContent = "Proyectos";
            texto.textContent = "Agregar un nuevo proyecto:";

            inputNombre.type = "text";
            inputNombre.placeholder = "Nombre del proyecto";
            inputNombre.style.cssText = "padding:8px; margin-bottom:8px; width:100%; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);";

            inputDescripcion.placeholder = "Descripción del proyecto";
            inputDescripcion.style.cssText = "padding:8px; margin-bottom:8px; width:100%; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);";

            selectEstado.style.cssText = "padding:8px; margin-bottom:8px; width:100%; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);";
            ["Pendiente", "En proceso", "Terminado"].forEach((estado) => {
                let opcion = document.createElement("option");
                opcion.value = estado;
                opcion.textContent = estado;
                selectEstado.append(opcion);
            });

            botonAgregar.textContent = "Agregar proyecto";
            botonAgregar.type = "button";
            botonAgregar.className = "btn-editar";
            botonAgregar.style.cssText = "padding:10px; font-weight:bold; cursor:pointer; width:100%;";

            botonAgregar.addEventListener("click", () => {
                let nombre = inputNombre.value.trim();
                let descripcion = inputDescripcion.value.trim();
                let estado = selectEstado.value;

                if (nombre === "") {
                    alert("Escribe el nombre del proyecto.");
                    return;
                }

                proyectos.push({ nombre, descripcion, estado });
                guardar();
                pintar();
            });

            proyectos.forEach((proyecto) => {
                let tarjeta = document.createElement("article");
                tarjeta.className = "nota-card";
                let nombreProyecto = document.createElement("h4");
                let descripcionProyecto = document.createElement("p");
                let estadoProyecto = document.createElement("p");
                let cambiarEstado = document.createElement("select");
                let borrar = document.createElement("button");

                nombreProyecto.textContent = proyecto.nombre;
                descripcionProyecto.textContent = proyecto.descripcion || "Sin descripción";
                estadoProyecto.textContent = "Estado: " + (proyecto.estado || "Pendiente");

                ["Pendiente", "En proceso", "Terminado"].forEach((estado) => {
                    let opcion = document.createElement("option");
                    opcion.value = estado;
                    opcion.textContent = estado;
                    if ((proyecto.estado || "Pendiente") === estado) opcion.selected = true;
                    cambiarEstado.append(opcion);
                });

                cambiarEstado.addEventListener("change", () => {
                    proyecto.estado = cambiarEstado.value;
                    guardar();
                    pintar();
                });

                borrar.textContent = "Eliminar";
                borrar.type = "button";
                borrar.className = "btn-eliminar";
                borrar.style.marginTop = "8px";

                borrar.addEventListener("click", () => {
                    proyectos.splice(proyectos.indexOf(proyecto), 1);
                    guardar();
                    pintar();
                });

                tarjeta.append(nombreProyecto, descripcionProyecto, estadoProyecto, cambiarEstado, borrar);
                lista.append(tarjeta);
            });

            contenedor.append(titulo, texto, inputNombre, inputDescripcion, selectEstado, botonAgregar, lista);

        } else if (vistaActiva === "ajustes") {
            let titulo = document.createElement("h3");
            let texto = document.createElement("p");
            let botonLimpiar = document.createElement("button");

            titulo.textContent = "Ajustes";
            texto.textContent = "Los datos se almacenan en localStorage.";
            botonLimpiar.textContent = "Limpiar todos los proyectos";
            botonLimpiar.type = "button";
            botonLimpiar.className = "btn-eliminar";
            botonLimpiar.style.marginTop = "10px";

            botonLimpiar.addEventListener("click", () => {
                if (confirm("¿Deseas eliminar todos los proyectos?")) {
                    proyectos = [];
                    guardar();
                    pintar();
                }
            });

            contenedor.append(titulo, texto, botonLimpiar);
        }
    }

    document.querySelectorAll("#nav-p8-alberto button[data-vista]").forEach((boton) => {
        boton.addEventListener("click", () => {
            cambiarVista(boton.dataset.vista);
        });
    });

    if (!["inicio", "proyectos", "ajustes"].includes(vistaActiva)) {
        vistaActiva = "inicio";
    }

    pintar();
}

// --- logica de aneth adaptada ---
function iniciarLogicaP8Aneth() {
    const claveStorage = "aplicacionProyectos_aneth";

    const btnInicio = document.querySelector('#btnInicio-aneth');
    const btnProyectos = document.querySelector('#btnProyectos-aneth');
    const btnAjustes = document.querySelector('#btnAjustes-aneth');

    const pantallaInicio = document.querySelector("#inicio-aneth");
    const pantallaProyectos = document.querySelector("#proyectos-aneth");
    const pantallaAjustes = document.querySelector("#ajustes-aneth");

    const inputNomProyecto = document.querySelector('#nomProyectos-aneth');
    const btnGuardarProyecto = document.querySelector('#btnGuardarProyecto-aneth');
    const contadorProyectos = document.querySelector('#contadorProyectos-aneth');
    const listaProyectosAjustes = document.querySelector('#listaProyectosAjustes-aneth');

    let estado = JSON.parse(localStorage.getItem(claveStorage)) || {
        vista: "inicio",
        listaProyectos: []
    };

    if (!Array.isArray(estado.listaProyectos)) {
        estado.listaProyectos = [];
    }

    function guardar() {
        localStorage.setItem(claveStorage, JSON.stringify(estado));
    }

    function ocultarTodas() {
        if (pantallaInicio) pantallaInicio.style.display = 'none';
        if (pantallaProyectos) pantallaProyectos.style.display = 'none';
        if (pantallaAjustes) pantallaAjustes.style.display = 'none';
    }

    function cambiarVista(nombreVista) {
        estado.vista = nombreVista;
        guardar();
        ocultarTodas();

        if (nombreVista === 'inicio' && pantallaInicio) {
            pantallaInicio.style.display = 'block';
        } else if (nombreVista === 'proyectos' && pantallaProyectos) {
            pantallaProyectos.style.display = 'block';
        } else if (nombreVista === 'ajustes' && pantallaAjustes) {
            pantallaAjustes.style.display = 'block';
        }

        renderizar();
    }

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
                    tarjeta.className = 'nota-card';

                    tarjeta.innerHTML = `
                        <p><strong>${proyecto}</strong></p>
                        <button type="button" class="btn-eliminar" data-index="${index}" style="margin-top:6px; padding:6px 10px; cursor:pointer;">Eliminar</button>
                    `;

                    listaProyectosAjustes.appendChild(tarjeta);
                });

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

    function eliminarProyecto(index) {
        estado.listaProyectos.splice(index, 1);
        guardar();
        renderizar();
    }

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

    if (btnInicio) btnInicio.addEventListener('click', () => cambiarVista('inicio'));
    if (btnProyectos) btnProyectos.addEventListener('click', () => cambiarVista('proyectos'));
    if (btnAjustes) btnAjustes.addEventListener('click', () => cambiarVista('ajustes'));

    cambiarVista(estado.vista);
}



// ------------------------------------
// logica para la practica 9 (nomina)
// ------------------------------------

function cargarPractica9(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    if (integrante === 'alberto') {
        // estructura html de la version de alberto
        contenedorPrincipal.innerHTML = `
            <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
                <h2 style="text-align:center;">Nomina - (ALBERTO)</h2>
                <form id="formularioNomina-alberto" style="max-width:100%; margin:0 auto; background:transparent; box-shadow:none; border:none; padding:0;">
                    <label style="font-weight:600; display:block; margin-bottom:6px;">Nombre:</label>
                    <input type="text" id="NombreEmpleado-alberto" required style="width:100%; padding:10px; margin-bottom:12px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                    
                    <label style="font-weight:600; display:block; margin-bottom:6px;">Horas:</label>
                    <input type="number" id="horasTrabajadas-alberto" required style="width:100%; padding:10px; margin-bottom:12px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                    
                    <label style="font-weight:600; display:block; margin-bottom:6px;">Pago por hora:</label>
                    <input type="number" id="pagoHora-alberto" required style="width:100%; padding:10px; margin-bottom:12px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                    
                    <div style="display:flex; gap:10px;">
                        <button type="submit" class="btn-editar" style="flex:1; padding:10px; font-weight:bold; cursor:pointer;">Mostrar calculo</button>
                    </div>
                </form>
                <hr style="margin:20px 0; border:0; border-top:1px solid var(--gray-border);">
                <h3>Resultado:</h3>
                <div id="resultado-alberto" style="padding:12px; background:var(--pale-pink); border-radius:8px; border:1px solid var(--gray-border);"></div>
            </div>
        `;
        iniciarLogicaP9Alberto();

    } else if (integrante === 'aneth') {
        // estructura html de la version de aneth
        contenedorPrincipal.innerHTML = `
            <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
                <h2 style="text-align:center;">Cálculo de Pago de Nómina - (ANETH)</h2>
                <form id="formulario-pago-aneth" style="max-width:100%; margin:0 auto; background:transparent; box-shadow:none; border:none; padding:0;">
                    <label style="font-weight:600; display:block; margin-top:10px; margin-bottom:6px;">Nombre del empleado:</label>
                    <input type="text" id="empleado-aneth" required placeholder="Ej. Mario Zapata" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">

                    <label style="font-weight:600; display:block; margin-top:10px; margin-bottom:6px;">Total de horas trabajadas:</label>
                    <input type="number" id="horas-aneth" step="1" min="1" required placeholder="0" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">

                    <label style="font-weight:600; display:block; margin-top:10px; margin-bottom:6px;">Pago por una hora trabajada ($):</label>
                    <input type="number" id="pago_hora-aneth" step="10" min="0" required placeholder="0" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">

                    <button type="submit" class="btn-editar" style="width:100%; padding:10px; font-weight:bold; cursor:pointer; margin-top:10px;">Calcular</button>
                </form>
                <hr style="margin:20px 0; border:0; border-top:1px solid var(--gray-border);">
                <div id="resultado-aneth" style="padding:12px; background:var(--pale-pink); border-radius:8px; border:1px solid var(--gray-border);">Esperando datos...</div>
            </div>
        `;
        iniciarLogicaP9Aneth();
    }
}

// --- logica de alberto adaptada ---
function iniciarLogicaP9Alberto() {
    let nomina = JSON.parse(localStorage.getItem('nominaClientes_alberto')) || [];
    const formulario = document.querySelector("#formularioNomina-alberto");
    const resultado = document.querySelector("#resultado-alberto");

    function guardar() {
        localStorage.setItem('nominaClientes_alberto', JSON.stringify(nomina));
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.querySelector("#NombreEmpleado-alberto").value;
        const horas = Number(document.querySelector("#horasTrabajadas-alberto").value);
        const pago = Number(document.querySelector("#pagoHora-alberto").value);

        let extra = 0;
        let pagototal = 0;
        let total = 0;

        if (horas > 40) {
            pagototal = pago * 40;
            extra = horas - 40;
            let mas = pago * 1.5;
            let sum = mas * extra;
            total = pagototal + sum;
        } else {
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

        resultado.innerHTML = `
            <p><strong>Nombre: </strong>${nombre}</p>
            <p><strong>Horas Trabajadas: </strong>${horas}</p>
            <p><strong>Horas extra: </strong>${extra}</p>
            <p><strong>Pago total: </strong>$${total}</p>
        `;
    });
}

// --- logica de aneth adaptada ---
function iniciarLogicaP9Aneth() {
    const formulario = document.querySelector('#formulario-pago-aneth');
    const contenedorResultado = document.querySelector('#resultado-aneth');
    const campoEmpleado = document.querySelector('#empleado-aneth');
    const campoHoras = document.querySelector('#horas-aneth');
    const campoPagoHora = document.querySelector('#pago_hora-aneth');
    const clavePago = 'practica9.nomina_aneth';

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
}

// ==========================================
// logica para la practica 10 (formulario completo)
// ==========================================

function cargarPractica10(integrante) {
    const contenedorPrincipal = document.querySelector("#contenedorPractica");
    if (!contenedorPrincipal) return;

    // inyectamos la estructura html real de la practica 10
    contenedorPrincipal.innerHTML = `
        <div class="nota-card" style="grid-column: 1 / -1; border-left: 5px solid var(--primary-pink); padding: 20px;">
            <h1 style="font-size: 1.4rem; text-align: center; margin-bottom: 15px;">Ejercicio 3. Calculo de Nomina / Registro - (${integrante.toUpperCase()})</h1>

            <form id="formEncuesta-${integrante}" style="max-width: 100%; margin: 0 auto; background: transparent; box-shadow: none; border: none; padding: 0;">
                <label for="nombre-${integrante}" style="display:block; margin-bottom:6px; font-weight:600;">Nombre del Alumno:</label>
                <input type="text" id="nombre-${integrante}" name="nombre" required style="width:100%; padding:10px; margin-bottom:12px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">

                <label for="horas-${integrante}" style="display:block; margin-bottom:6px; font-weight:600;">Grupo / Horas:</label>
                <input type="number" id="horas-${integrante}" name="horas" step="0.01" min="0" required style="width:100%; padding:10px; margin-bottom:12px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">

                <label for="carrera-${integrante}" style="display:block; margin-bottom:6px; font-weight:600;">Carrera:</label>
                <select id="carrera-${integrante}" name="carrera" required style="width:100%; padding:10px; margin-bottom:12px; border:1px solid var(--gray-border); border-radius:6px; background:var(--pale-pink);">
                    <option value="">-- Selecciona --</option>
                    <option value="ITI">Ing. en Tecnologias de la Informacion</option>
                    <option value="ISC">Ing. en Sistemas Computacionales</option>
                    <option value="IIND">Ing. Industrial</option>
                    <option value="IBIO">Ing. Biomedica</option>
                </select>

                <div style="margin-bottom: 12px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600;">Opcion:</label>
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <label><input type="radio" name="opcionRadio" value="1" required> 1</label>
                        <label><input type="radio" name="opcionRadio" value="2"> 2</label>
                        <label><input type="radio" name="opcionRadio" value="3"> 3</label>
                        <label><input type="radio" name="opcionRadio" value="4"> 4</label>
                    </div>
                </div>

                <button type="submit" class="btn-editar" style="width:100%; padding:10px; font-weight:bold; cursor:pointer;">Calcular / Guardar</button>
            </form>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid var(--gray-border);">
            <h2 style="font-size: 1.2rem; text-align: center;">Resultado</h2>
            <div id="resultado-${integrante}" style="padding: 12px; background: var(--pale-pink); border-radius: 8px; border: 1px solid var(--gray-border);"></div>
        </div>
    `;

    // iniciamos la logica adaptada para el integrante
    iniciarLogicaP10Real(integrante);
}

function iniciarLogicaP10Real(integrante) {
    const claveStorage = `ejercicioNominaCurso_${integrante}`;
    const formulario = document.querySelector(`#formEncuesta-${integrante}`);
    const resultado = document.querySelector(`#resultado-${integrante}`);

    // agrega una linea con etiqueta y valor al resultado
    function agregarLinea(etiqueta, valor) {
        const parrafo = document.createElement("p");
        const fuerte = document.createElement("strong");

        fuerte.textContent = etiqueta + ": ";
        parrafo.append(fuerte, valor);
        resultado.append(parrafo);
    }

    // muestra cada valor capturado
    function mostrarResultado(datos) {
        resultado.replaceChildren();
        agregarLinea("Nombre", datos.nombre);
        agregarLinea("Grupo / Horas", datos.horas);
        agregarLinea("Carrera", datos.carrera);
        agregarLinea("Opcion", datos.opcionRadio);
    }

    // carga los datos guardados en localstorage
    function cargar() {
        const guardada = localStorage.getItem(claveStorage);
        if (!guardada) {
            return;
        }
        const datos = JSON.parse(guardada);
        Object.entries(datos).forEach(([campo, valor]) => {
            if (formulario.elements[campo]) {
                if (formulario.elements[campo].type === "radio") {
                    const radio = formulario.querySelector(`input[name="${campo}"][value="${valor}"]`);
                    if (radio) radio.checked = true;
                } else {
                    formulario.elements[campo].value = valor;
                }
            }
        });
        mostrarResultado(datos);
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const datos = Object.fromEntries(new FormData(formulario));
        datos.nombre = datos.nombre ? datos.nombre.trim() : "";
        datos.horas = datos.horas ? datos.horas.trim() : "";
        datos.carrera = datos.carrera ? datos.carrera.trim() : "";

        // guarda en localstorage y muestra en pantalla
        localStorage.setItem(claveStorage, JSON.stringify(datos));
        mostrarResultado(datos);
    });

    cargar();
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
