function renderAsteroids(asteroids, tableBody) {
    tableBody.innerHTML = '';

    asteroids.forEach(asteroid => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = asteroid.name;
        row.insertCell().textContent = asteroid.size;
        row.insertCell().textContent = asteroid.velocity;
        row.insertCell().textContent = asteroid.approachDate;
        const hazardousCell = row.insertCell();
        hazardousCell.textContent = asteroid.is_potentially_hazardous_asteroid ? 'Es potencialmente peligroso' : 'No es peligroso';
        asteroid.is_potentially_hazardous_asteroid && row.classList.add('hazardous');
    });
}