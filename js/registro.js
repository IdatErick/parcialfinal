function guardarDatos() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (nombre && email && password) {
        const usuario = { nombre, email, password };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Usuario registrado con éxito');
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function irALogin() {
    window.location.href = 'Login.html';
}