// Variables globales
let carrito = [];
const carritoIcono = document.getElementById('img-carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Actualizar el contador del ícono del carrito
function actualizarContadorCarrito() {
    const totalProductos = carrito.reduce((total, prod) => total + prod.cantidad, 0);
    carritoIcono.dataset.count = totalProductos;
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    const existe = carrito.find(prod => prod.id === producto.id);
    if (existe) {
        existe.cantidad += producto.cantidad; // Suma la cantidad seleccionada al carrito
    } else {
        carrito.push(producto); // Agrega el nuevo producto al carrito
    }
    actualizarCarritoHTML();
}

// Actualizar el HTML del carrito
function actualizarCarritoHTML() {
    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio} x ${producto.cantidad}</td>
            <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
            <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
        `;
        listaCarrito.appendChild(fila);
    });

    actualizarContadorCarrito();
    agregarBotonWhatsApp();
}

// Eliminar producto del carrito
function eliminarProductoCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarritoHTML();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    actualizarCarritoHTML();
});

// Capturar evento de clic en el botón "Agregar al carrito"
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        // Accedemos al contenedor del producto
        const producto = e.target.closest('.product');

        // Obtenemos los datos del producto, incluyendo el contador dinámico
        const productoData = {
            id: parseInt(e.target.getAttribute('data-id')),
            nombre: producto.querySelector('h3').textContent,
            precio: parseFloat(producto.querySelector('.precio').textContent.replace('$', '')),
            cantidad: parseInt(producto.querySelector('.cantidad').textContent), // Toma el valor actual del contador
            imagen: producto.querySelector('img').src
        };

        agregarAlCarrito(productoData);
    });
});

// Evento para eliminar producto con el botón "X"
listaCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('borrar-producto')) {
        e.preventDefault();
        const idProducto = parseInt(e.target.getAttribute('data-id'));
        eliminarProductoCarrito(idProducto);
    }
});

// Botón para enviar el carrito por WhatsApp
function agregarBotonWhatsApp() {
    const totalFinal = carrito.reduce((total, prod) => total + prod.precio * prod.cantidad, 0).toFixed(2);
    const mensajeWhatsApp = carrito
        .map(prod => `${prod.nombre} x${prod.cantidad} - $${(prod.precio * prod.cantidad).toFixed(2)}`)
        .join('\n'); // Usa \n para saltos de línea en lugar de %0A

    const mensajeCompleto = `¡Hola! Mi pedido es:\n${mensajeWhatsApp}\n\nTotal: $${totalFinal}`;

    const botonWhatsApp = `
        <a href="https://wa.me/?text=${encodeURIComponent(mensajeCompleto)}" target="_blank" class="btn-2 enviar-whatsapp">Enviar por WhatsApp</a>
    `;

    const contenedorBotones = document.querySelector('.carrito');
    if (!document.querySelector('.enviar-whatsapp')) {
        contenedorBotones.insertAdjacentHTML('beforeend', botonWhatsApp);
    } else {
        document.querySelector('.enviar-whatsapp').href = `https://wa.me/?text=${encodeURIComponent(mensajeCompleto)}`;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar todos los contadores
    const contadores = document.querySelectorAll(".contador");

    contadores.forEach(contador => {
        const btnIncrementar = contador.querySelector(".btn-incrementar");
        const btnDecrementar = contador.querySelector(".btn-decrementar");
        const spanCantidad = contador.querySelector(".cantidad");

        // Evento para incrementar la cantidad
        btnIncrementar.addEventListener("click", () => {
            let cantidadActual = parseInt(spanCantidad.textContent);
            cantidadActual++;
            spanCantidad.textContent = cantidadActual;
        });

        // Evento para decrementar la cantidad
        btnDecrementar.addEventListener("click", () => {
            let cantidadActual = parseInt(spanCantidad.textContent);
            if (cantidadActual > 1) { // Evitar que la cantidad sea menor a 1
                cantidadActual--;
                spanCantidad.textContent = cantidadActual;
            }
        });
    });
});

