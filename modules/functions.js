export let url = 'https://aulamindhub.github.io/amazing-api/events.json'

export function mostrarCards(cards) {

    let contenedor = document.getElementById("contenedor")
    let card = document.createElement("div")
    card.className = "card col-10 col-md-5 col-lg-3 col-xl-2"
    card.innerHTML = `
    <img src="${cards.image}" class="card-img-top" >
    <div class="card-body text-center d-flex flex-column justify-content-between">
      <h5 class="card-title">${cards.name}</h5>
      <p class="card-text">${cards.description}</p>
      <div class="d-flex justify-content-around align-items-center">
        <p class="fw-bold m-0">Price: $${cards.price}</p>
        <button class="btn btn-primary" onclick="redirigirADetalles('${cards._id}')">Details</button>
      </div>
    </div>`
    
    contenedor.appendChild(card)   
}

function redirigirADetalles(eventId) {
    window.location.href = `./pages/details.html?id=${eventId}`;
}
window.redirigirADetalles = redirigirADetalles;

export function categorias(checks) {
    let filtros = document.getElementById("filtros")
  
    let categoriasUnicas = Array.from(new Set(checks.map(event => event.category)));
    categoriasUnicas.forEach(categoria => {
      let check = document.createElement("div")
      check.className = "form-check d-flex align-items-center flex-wrap gap-2"
      check.innerHTML = `
        <div class="d-flex gap-2">
          <input id="${categoria}" class="form-check-input" type="checkbox" value="${categoria}">
          <label class="form-check-label" for="${categoria}">
            ${categoria}
          </label>
        </div>
      `
      filtros.appendChild(check)
      
      check.querySelector("input").addEventListener("change", () => {
      let eventosFiltrados = filtrarPorCategoria(checks);
      actualizarCards(eventosFiltrados);
        });
    });
}

export function actualizarCards(cards) {
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    if (cards.length === 0) {
        contenedor.innerHTML = "<p class='text-center p-5 bg-dark text-light rounded fw-bold'>THERE ARE NOT EVENTS LIKE THAT IN THIS MOMENT</p>";
    } else {
        cards.forEach(card => mostrarCards(card));
    }
} 
  
export function filtrarPorCategoria(events) {
    let checkeados = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(check => check.value);
    let filtrados = events.filter(event => checkeados.length === 0 || checkeados.includes(event.category));
    return filtrados;
}
  
export function filtrarPorBuscador(events) {
    let busqueda = document.getElementById("input_buscador").value.toLowerCase();
    let filtrados = filtrarPorCategoria(events);
    if (busqueda) {
      filtrados = filtrados.filter(card => card.name.toLowerCase().includes(busqueda) || card.description.toLowerCase().includes(busqueda));
    }
    actualizarCards(filtrados);
}
  
export function inicializar(filtros) {
    document.getElementById("filtros").addEventListener("change", () => filtrarPorBuscador(filtros.events))
    document.getElementById("button").addEventListener("click", () => filtrarPorBuscador(filtros.events))
}