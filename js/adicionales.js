document.addEventListener('DOMContentLoaded', () => {
    // Solo ejecutar el código si existe el botón de agregar (es decir, si estamos en la página de adicionales)
    if (!document.getElementById('btnagregaradi')) return;

    // Botones y campos de cantidad
    const botonesIncrementar = document.querySelectorAll('.incrementar');
    const botonesDecrementar = document.querySelectorAll('.decrementar');
    const inputsCantidad = document.querySelectorAll('.cantidad-input');

    // Límites de cantidad para cada producto
    const limites = {
        'cantidad1': { max: 1, mensaje: 'Solo tenemos 1 cabeza de coco :(' },
        'cantidad2': { max: 4, mensaje: 'Solo tenemos 4 dibujitos :(' },
        'cantidad3': { max: 15 },
        'cantidad4': { max: 15 },
        'cantidad5': { max: 15 }
    };

    // Función para actualizar la cantidad
    const actualizarCantidad = (input, incremento) => {
        const id = input.id;
        let cantidad = parseInt(input.value) || 0;
        const max = limites[id].max;

        // Calcular la nueva cantidad
        cantidad += incremento;

        if (cantidad < 0) cantidad = 0;
        if (cantidad > max) {
            cantidad = max;
            if (limites[id].mensaje) {
                alert(limites[id].mensaje);
            }
        }

        input.value = cantidad;
        localStorage.setItem(id, cantidad);
    };

    // Eventos para incrementar y decrementar
    botonesIncrementar.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            actualizarCantidad(input, 1);
        });
    });

    botonesDecrementar.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.nextElementSibling;
            actualizarCantidad(input, -1);
        });
    });

    // Cargar cantidades guardadas al iniciar la página
    inputsCantidad.forEach(input => {
        const cantidadGuardada = localStorage.getItem(input.id);
        if (cantidadGuardada) {
            input.value = cantidadGuardada;
        }
    });

    // Guardar cantidad al cambiar manualmente
    inputsCantidad.forEach(input => {
        input.addEventListener('change', () => {
            actualizarCantidad(input, 0);
        });
    });

    // Botón para agregar productos al carrito y reiniciar los contadores
    document.getElementById('btnagregaradi').addEventListener('click', () => {
        inputsCantidad.forEach(input => {
            const id = input.id;
            const cantidad = parseInt(input.value) || 0;
            if (cantidad > 0) {
                localStorage.setItem(id, cantidad);
            }
            input.value = 0; // Reiniciar el contador a 0
        });
        alert('Productos añadidos al carrito.');
    });
});
