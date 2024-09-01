import * as functions from "../modules/functions.js";



fetch(functions.url)
  .then(response => response.json())
  .then(data => {
    const upcomingEvents = data.events.filter(event => {
      const fechaEvento = event.date;
      const fechaActual = data.currentDate;
      return fechaEvento > fechaActual;
    });
    data.events = upcomingEvents;

    functions.actualizarCards(data.events)
    functions.categorias(data.events)
    functions.inicializar(data)

})
function redirigirADetalles(eventId) {
  window.location.href = `./details.html?id=${eventId}`;
}
window.redirigirADetalles = redirigirADetalles;