document.addEventListener('DOMContentLoaded', () => {
    const carritoContenido = document.getElementById('carrito-contenido');

    
    const productos = {
        'cantidad1': { nombre: 'Cabeza de Coco', img: 'imgs/webp/productos/1.webp' },
        'cantidad2': { nombre: 'Dibujitos', img: 'imgs/webp/productos/2.webp' },
        'cantidad3': { nombre: 'Mesas', img: 'imgs/webp/productos/3.webp' },
        'cantidad4': { nombre: 'Sillas', img: 'imgs/webp/productos/4.webp' },
        'cantidad5': { nombre: 'Transporte', img: 'imgs/webp/productos/5.webp' }
    };

    const cargarCarrito = () => {
        carritoContenido.innerHTML = '';
        Object.keys(productos).forEach(id => {
            const cantidad = parseInt(localStorage.getItem(id)) || 0;
            if (cantidad > 0) {
                carritoContenido.innerHTML += `
                    <div class="carrito-item">
                        <img src="${productos[id].img}" alt="${productos[id].nombre}">
                        <h4>${productos[id].nombre} (x${cantidad})</h4>
                        <div class="acciones">
                            <button class="btn-eliminar-uno" data-id="${id}">Eliminar 1</button>
                            <button class="btn-eliminar-todo" data-id="${id}">Eliminar Todo</button>
                        </div>
                    </div>
                `;
            }
        });

        if (carritoContenido.innerHTML.trim() === '') {
            carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
        }

        agregarEventosEliminar();
    };


    const agregarEventosEliminar = () => {
        document.querySelectorAll('.btn-eliminar-uno').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                let cantidad = parseInt(localStorage.getItem(id)) || 0;
                if (cantidad > 1) {
                    localStorage.setItem(id, cantidad - 1);
                } else {
                    localStorage.removeItem(id);
                }
                cargarCarrito();
            });
        })
        document.querySelectorAll('.btn-eliminar-todo').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                localStorage.removeItem(id);
                cargarCarrito();
            });
        });
    };

    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            Object.keys(productos).forEach(id => {
                localStorage.removeItem(id);
            });
            cargarCarrito();
        });
    }

    cargarCarrito();
});
