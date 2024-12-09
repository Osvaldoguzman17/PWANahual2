document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://nahual-eae72-default-rtdb.firebaseio.com/.json"; // API de Firebase
    const personajesSection = document.getElementById("personajes"); // Obtener datos de la API de Firebase
    const localApiUrl = "http://localhost:3000/players"; // Endpoint de Node.js
    const jugadoresSection = document.getElementById("jugadores");
  
    // Cargar datos de personajes desde Firebase
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Verificar si los datos se reciben correctamente
        console.log("Personajes desde Firebase:", data); // Esto te ayudará a ver el formato de los datos
  
        if (data && data.personajes) {
          const personajes = data.personajes;
          personajesSection.innerHTML = personajes.map(personaje => `
            <div class="card">
              <img src="${personaje.imagen}" alt="${personaje.nombre}">
              <div>
                <h3>${personaje.nombre}</h3>
                <p><strong>Función:</strong> ${personaje.funcion}</p>
                <p><strong>Vida:</strong> ${personaje.vida}</p>
                <p><strong>Habilidades:</strong> ${personaje.habilidades.join(", ")}</p>
              </div>
            </div>
          `).join("");
        } else {
          personajesSection.innerHTML = "<p>No se encontraron personajes.</p>";
        }
      })
      .catch(error => {
        personajesSection.innerHTML = "<p>Error al cargar los datos.</p>";
        console.error("Error al obtener datos:", error);
      });
  
    // Cargar datos de jugadores desde el backend local
    fetch(localApiUrl)
  .then(response => response.json())
  .then(data => {
    console.log("Jugadores desde MySQL:", data);
    jugadoresSection.innerHTML = data.map(jugador => `
      <div class="card">
        <h3>${jugador.nombre}</h3>
        <p><strong>Correo:</strong> ${jugador.correo}</p>
        <p><strong>Fecha de Registro:</strong> ${jugador.fecha_registro}</p>
        <p><strong>Nivel:</strong> ${jugador.nivel}</p>
        <p><strong>Comentario:</strong> ${jugador.comentario || "Sin comentarios"}</p>
      </div>
    `).join("");
  })
  .catch(error => {
    jugadoresSection.innerHTML = "<p>Error al cargar los datos de jugadores.</p>";
    console.error("Error al obtener jugadores:", error);
  });

  
    // Registrar el service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("js/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.error("Error al registrar el Service Worker:", err));
    }
  
    // Manejo de la instalación de la PWA
    let deferredPrompt; // Guarda el evento antes de la instalación
    const installButton = document.getElementById("install-button");  // Si tienes un botón de instalación
  
    window.addEventListener("beforeinstallprompt", (event) => {
      // Evitar que el navegador muestre el prompt por defecto
      event.preventDefault();
      // Guarda el evento para usarlo después
      deferredPrompt = event;
  
      // Mostrar el botón de instalación
      installButton.style.display = "block";  // Asegúrate de tener un botón para esto en el HTML
  
      // Agregar el evento al botón de instalación
      installButton.addEventListener("click", () => {
        // Mostrar el prompt de instalación
        deferredPrompt.prompt();
        
        // Esperar la respuesta del usuario
        deferredPrompt.userChoice.then((choiceResult) => {
          console.log(`El usuario ${choiceResult.outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`);
          deferredPrompt = null; // Resetea el prompt
        });
      });
    });
  });
  