import * as functions from "./modules/functions.js";



fetch(functions.url)
  .then(response => response.json())
  .then(data => {
    functions.actualizarCards(data.events)
    functions.categorias(data.events)
    functions.inicializar(data)
  })
