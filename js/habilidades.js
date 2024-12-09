document.getElementById('add-player-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const level = document.getElementById('level').value;
    const comment = document.getElementById('comment').value; // Nuevo campo de comentario

    // Validación de campos
    if (!name || !email || !date || !level) {
        alert('Por favor, completa todos los campos obligatorios');
        return; // Detiene la ejecución si hay campos faltantes
    }

    const playerData = {
        name: name,
        email: email,
        date: date,
        level: level,
        comment: comment
    };

    // Enviar los datos al servidor
    fetch('http://localhost:3000/add-player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
    })
    .then(response => {
        if (!response.ok) {
            // Si el servidor envía un error, lanzamos el mensaje para manejarlo en el catch
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        alert('Jugador agregado con éxito');
        // Redirigir a index.html
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error al agregar jugador:', error.message);
        alert('Error: ' + error.message); // Muestra el error al usuario
    });
});
