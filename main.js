
const contenedorProductos = document.querySelector('#contenedor-productos');

// Función que muestra los productos
const mostrarProductos = (data) => {
    contenedorProductos.innerHTML = ''; 
    data.forEach(producto => {
        const cardProducto = document.createElement('article');
        cardProducto.innerHTML = `
            <img class="prod-img" src="${producto.img}" alt="${producto.nombre}" />
            <div class="prod-description">
                <h5 class="tool-nombre">${producto.nombre}</h5>
                <h5 class="tool-price">$${producto.price}</h5>
                <button id="${producto.id}" class="btn-compra">COMPRAR</button>
            </div>
        `;
        contenedorProductos.appendChild(cardProducto);
    });

    const btnComprar = document.querySelectorAll('.btn-compra');
    btnComprar.forEach(el => {
        el.addEventListener('click', (e) => {
            agregarAlCarrito(e.target.id);
        });
    });
}

// Función que ordena y filtra los productos
const filtrarYOrdenarProductos = (criterioOrden) => {
    let productosOrdenados = [...productos];
    
    if (criterioOrden === 'menor-mayor') {
        productosOrdenados.sort((a, b) => a.price - b.price);
    } else if (criterioOrden === 'mayor-menor') {
        productosOrdenados.sort((a, b) => b.price - a.price);
    }

    mostrarProductos(productosOrdenados);
}

const selectOrdenar = document.querySelector('#ordenar-precio');
selectOrdenar.addEventListener('change', (e) => {
    const criterio = e.target.value;
    filtrarYOrdenarProductos(criterio);
});

// Inicialmente muestra productos ordenados de menor a mayor
filtrarYOrdenarProductos('menor-mayor');

const carrito = [];

function agregarAlCarrito(id) {
    const prodEncontrado = productos.find(prod => prod.id === parseInt(id));
    
    if (prodEncontrado) {
        carrito.push(prodEncontrado);
        console.log("Producto agregado al carrito:", prodEncontrado);
    } else {
        console.log("Producto no encontrado");
    }
    
    console.log("Carrito:", carrito);
}