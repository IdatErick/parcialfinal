
function agregarAlCarrito() {
    const seleccion = document.querySelector('input[name="size"]:checked');
    if (seleccion) {        
        const tematicaSeleccionada = seleccion.value;
        localStorage.setItem('tematica', tematicaSeleccionada);

        alert(`${tematicaSeleccionada} ha sido añadida al carrito.`);
        window.location.href = 'adicionales.html'; 
    } else {

        alert("Por favor, selecciona una temática.");
    }
}

