
// catalogo de productos fijo
let productos = [
    { id: 1, nombre: "Libro JS", precio: 450 },
    { id: 2, nombre: "Ebook css", precio: 400 },
    { id: 3, nombre: "Libro HTML", precio: 200 }
];

// se intenta leer el formato guardado
// y se crea uno nuevo si hay falla

let carrito;

try {

    carrito = JSON.parse(localStorage.getItem("carritoVersionado")) || {
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

// guardar

function guardar() {

    // actualiza la fecha y persiste el carrito de compras
    carrito.actualizado = Date.now();

    localStorage.setItem(
        "carritoVersionado",
        JSON.stringify(carrito)
    );

}

// pintar

function pintar() {

    // muestra el estado actual del carrito
    let contenedor = document.querySelector("#productos");

    productos.forEach((producto) => {

        let item = document.createElement("article");

        item.className = "producto";

        item.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <button>Agregar</button>
        `;

        item.querySelector("button").addEventListener("click", () => {

            // busca si el producto ya existe en el carrito
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

        contenedor.append(item);

    });

    mostrarTotal();

}

// mostrar total

function mostrarTotal() {

    // suma precio por cantidad y actualiza el carrito

    let total = carrito.productos.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    document.querySelector("#total").textContent =
        `Total: $${total}`;

    document.querySelector("#estado").textContent =
        `Versión ${carrito.version} - ${carrito.productos.length} productos`;

}

// vaciar carrito

document.querySelector("#vaciar").addEventListener("click", () => {

    // conserva la estructura y solo vacía los productos

    carrito.productos = [];

    guardar();
    mostrarTotal();

});

// iniciar

pintar();
