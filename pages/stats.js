import { url } from "../modules/functions.js";

function assistance(events) {
    let filteredEvents = events.map(event => ({
        name: event.name,
        assistancePercentage: parseInt(event.assistance || event.estimate) * 100 / parseInt(event.capacity)
    }));
    
    filteredEvents.sort((a, b) => a.assistancePercentage - b.assistancePercentage);

    return filteredEvents;
}


fetch(url)
    .then(response => response.json())
    .then(data => {
        const pastEvents = data.events.filter(event => event.date < data.currentDate);

        let container = document.getElementById("table");
        let table = document.createElement("table");
        table.className = "table table-dark table-striped-columns";

        table.innerHTML = `
        <colgroup>
          <col span="3">
        </colgroup>
        <thead>
          <tr>
            <th scope="col" colspan="3">Events Statistics</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr class="fw-bold">
            <td>Events with highest % of assistance</td>
            <td>Events with lowest % of assistance</td>
            <td>Events with larger capacity</td>
          </tr>
          
        </tbody>
        `;
        
        let largestCapacity = data.events.reduce((maxEvent, currentEvent) => {
            let currentCapacity = parseInt(currentEvent.capacity);
            let maxCapacity = parseInt(maxEvent.capacity);
            return currentCapacity > maxCapacity ? currentEvent : maxEvent;
        });

        const eventsAssistance = assistance(pastEvents);

        let tbody = table.querySelector("tbody"); 
        let rows = document.createElement("tr");
        rows.innerHTML = `
            <tr>
            <td>${eventsAssistance[eventsAssistance.length - 1].name}: ${eventsAssistance[eventsAssistance.length - 1].assistancePercentage.toFixed(2)}%</td>
            <td>${eventsAssistance[0].name}: ${eventsAssistance[0].assistancePercentage.toFixed(2)}%</td>
            <td>${largestCapacity.name}: ${largestCapacity.capacity}</td>
            </tr>
            `;
            
        tbody.appendChild(rows);
        container.appendChild(table);
    }) 
    .catch(error => console.error('Error fetching data:', error));


function eventsXCategory(events) {
    let categories = {};
    
    events.forEach(event => {
        if (!categories[event.category]) {
            categories[event.category] = [];
        }
        categories[event.category].push(event);
    });
    
    let categoriesArray = [];
    for (let category in categories) {
        categoriesArray.push({
            category: category,
            events: categories[category]
        });
    }
    return categoriesArray;
}


function categoryStats(categoriesArray) {
    return categoriesArray.map(categoryGroup => {
        let totalRevenue = categoryGroup.events.reduce((sum, event) => sum + (event.price * (event.assistance || event.estimate)), 0);
        let totalAssistancePercentage = categoryGroup.events.reduce((sum, event) => sum + ((event.assistance || event.estimate) * 100 / event.capacity), 0) / categoryGroup.events.length;
        
        return {
            category: categoryGroup.category,
            revenue: totalRevenue,
            assistancePercentage: totalAssistancePercentage.toFixed(2)
        };
    });
}


fetch(url)
    .then(response => response.json())
    .then(data => {
        const upcomingEvents = data.events.filter(event => event.date > data.currentDate);
        const pastEvents = data.events.filter(event => event.date < data.currentDate);

        const categoriesArrayUP = eventsXCategory(upcomingEvents);
        const categoryStatisticsUP = categoryStats(categoriesArrayUP);
        
        const categoriesArrayPast = eventsXCategory(pastEvents);
        const categoryStatisticsPast = categoryStats(categoriesArrayPast);

        let container = document.getElementById("table");
        let table1 = document.createElement("table");
        let table2 = document.createElement("table");
        table2.className = "table table-dark table-striped-columns";
        table1.className = "table table-dark table-striped-columns";

        table1.innerHTML = `
        <colgroup>
          <col span="3">
        </colgroup>    
        <thead>
            <tr>
              <th scope="col" colspan="3">Upcoming Events Statistics by Category</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr class="fw-bold">
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of assistance (estimate)</td>
            </tr>
        </tbody>
        `;

        table2.innerHTML = `
        <colgroup>
          <col span="3">
        </colgroup>    
        <thead>
            <tr>
              <th scope="col" colspan="3">Past Events Statistics by Category</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr class="fw-bold">
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of assistance</td>
            </tr>
        </tbody>
        `;

        let tbody1 = table1.querySelector("tbody");
        categoryStatisticsUP.forEach(stat => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${stat.category}</td>
                <td>$${stat.revenue}</td>
                <td>${stat.assistancePercentage}%</td>
            `;

            tbody1.appendChild(row);
        });
        let tbody2 = table2.querySelector("tbody");
        categoryStatisticsPast.forEach(stat => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${stat.category}</td>
                <td>$${stat.revenue}</td>
                <td>${stat.assistancePercentage}%</td>
            `;
            tbody2.appendChild(row);
        });

        container.appendChild(table1);
        container.appendChild(table2);

    })
    .catch(error => console.error('Error fetching data:', error))


