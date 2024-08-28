import { url } from "../modules/functions.js";

function cardDetails(event) {
    let detalles = document.getElementById("details");
    detalles.innerHTML = '';

    let card = document.createElement("div");
    card.className = "bg-dark rounded d-flex flex-wrap justify-content-center align-self-center gap-3 p-3";
    card.innerHTML = `
        <img class="object-fit-cover rounded border border-light float-start col-10 col-md-7 col-lg-5 img-fluid" src="${event.image}" alt="${event.name}">
        <div class="border border-light rounded d-flex flex-column gap-2 p-2 col-10 col-md-7 col-lg-5">
            <h3 class="align-self-center text-center text-light">${event.name}</h3>
            <ul class="text-start text-light w-100">
                <li><span class="fw-bold">Date:</span> ${event.date}</li>
                <li><span class="fw-bold">Description:</span> ${event.description}</li>
                <li><span class="fw-bold">Category:</span> ${event.category}</li>
                <li><span class="fw-bold">Place:</span> ${event.place}</li>
                <li><span class="fw-bold">Capacity:</span> ${event.capacity}</li>
                <li><span class="fw-bold">Estimate or Assistance:</span> ${event.estimate || event.assistance}</li>
                <li><span class="fw-bold">Price:</span> $${event.price}</li>
            </ul>
        </div>`;

    detalles.appendChild(card);
}

fetch(url)
.then(response => response.json())
.then(data => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id'); 
    console.log('Event ID:', eventId);
    
    if (eventId) {
      const event = data.events.find(e => e._id == eventId);
      if (event) {
        cardDetails(event);
      } else {
        document.getElementById("details").innerHTML = "<p>Event not found</p>";
      }
    } else {
      document.getElementById("details").innerHTML = `
      <div class='m-5 p-5 text-center bg-dark text-light rounded fw-bold d-flex flex-column justify-content-center align-items-center'>
      <h2>Dear User</h2>
      <h3>Please, select an event in the previous pages to see its details</h3>
      </div>
      `
    }
})
.catch(error => console.error('Error fetching data:', error));  


