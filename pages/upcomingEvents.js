const fecha = new Date('2023-07-24');

let events = [
  {
    "_id": 1,
    "image":"../Recursos_Amazing_Events_Task_1/food_fair.jpg",
    "name": "Festival of the collectivities",
    "date": "2022-12-12",
    "description": "Enjoy your favorite dishes from different countries in a unique event for the whole family.",
    "category":"Food Fair",
    "place": "Room A",
    "capacity": 45000,
    "assistance":42756,
    "price": 5
  },
  {
    "_id": 2,
    "image":"../Recursos_Amazing_Events_Task_1/outing_to_the_museum.jpg",
    "name": "Art Exhibition",
    "date": "2022-11-02",
    "description": "Let's go to the art museum for an incredible tour to learn about the largest dinosaurs.",
    "category":"Museum",
    "place": "Field",
    "capacity": 82000,
    "assistance":65892,
    "price": 15
  },
  {
    "_id": 3,
    "image":"../Recursos_Amazing_Events_Task_1/costume_party.jpg",
    "name": "Halloween Night",
    "date": "2024-02-12",
    "description": "Come in your scariest costume character to win amazing prizes.",
    "category": "Costume Party",
    "place": "Room C",
    "capacity": 12000,
    "estimate":9000,
    "price": 12
  },
  {
    "_id": 4,
    "image":"../Recursos_Amazing_Events_Task_1/music_concert.jpg",
    "name": "Metallica in concert",
    "date": "2024-01-22",
    "description": "The only concert of the most emblematic band in the world",
    "category": "Music Concert",
    "place": "Room A",
    "capacity": 138000,
    "estimate":138000,
    "price": 150
  },
  {
    "id": 5,
    "image":"../Recursos_Amazing_Events_Task_1/marathon.jpg",
    "name": "10K for life",
    "date": "2022-03-01",
    "description": "Come and exercise, improve your health and lifestyle.",
    "category": "Race",
    "place": "Soccer Field",
    "capacity": 30000,
    "assistance":25698,
    "price": 3
  },
  {
    "_id": 6,
    "image":"../Recursos_Amazing_Events_Task_1/books.jpg",
    "name": "School Book Fair",
    "date": "2022-10-15",
    "description": "Bring your unused school book and bring the one you need.",
    "category": "Book Exchange",
    "place": "Room D1",
    "capacity": 150000,
    "assistance":123286,
    "price": 1
  },
  {
    "_id": 7,
    "image":"../Recursos_Amazing_Events_Task_1/cinema.jpg",
    "name": "Avengers",
    "date": "2023-10-15",
    "description": "Marvel's Avengers 3d premiere the start of an epic saga with your best superheroes",
    "category": "Let's go to the cinema",
    "place": "Room D1",
    "capacity": 9000,
    "estimate":9000,
    "price": 250
  },
]

const pastEvents = events.filter(event => {
  const fechaEvento = new Date(event.date);
  return fechaEvento > fecha;
});

for (let i = 0; i < pastEvents.length; i++) {
  let card = document.createElement("div")
  card.className = "card col-10 col-md-5 col-lg-3 col-xl-2"
  card.innerHTML = `
  <img src="${pastEvents[i].image}" class="card-img-top" >
                <div class="card-body text-center">
                  <h5 class="card-title">${pastEvents[i].name}</h5>
                  <p class="card-text">${pastEvents[i].description}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text mb-0">Price: $${pastEvents[i].price}</p>
                    <a href="./pages/details.html" class="btn btn-primary">Details</a>
                  </div>
                </div>`
  
  contenedor.appendChild(card)
}