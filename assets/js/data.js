document.addEventListener('DOMContentLoaded', async () => {
    const table = document.getElementById('asteroidsTable');
    const tableBody = document.getElementById('asteroidsTableBody');

    try {
        const asteroidsData = await getAsteroidsData();
        renderAsteroids(asteroidsData, tableBody);

        const sizeFilter = document.getElementById('size-filter');
        const sortBy = document.getElementById('sort-by');

        sizeFilter.addEventListener('change', () => {
            const selectedSize = sizeFilter.value;
            const filteredAsteroids = filterAsteroidsBySize(asteroidsData, selectedSize);
            renderAsteroids(filteredAsteroids, tableBody);
        });

        sortBy.addEventListener('change', () => {
            const selectedSortBy = sortBy.value;
            const sortedAsteroids = sortAsteroids(asteroidsData, selectedSortBy);
            renderAsteroids(sortedAsteroids, tableBody);
        });
    } catch (error) {
        console.error(error);
    }
});
async function getAsteroidsData() {
    try {
        const response = await fetch('http://127.127.127.127:3000/asteroids');
        const asteroidData = await response.json();
        return extractAsteroids(asteroidData);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
function extractAsteroids(asteroidData) {
    const asteroids = Object.values(asteroidData.near_earth_objects)
        .flatMap(dateAsteroids => dateAsteroids.map(asteroid => ({
            name: asteroid.name,
            size: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
            velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
            approachDate: asteroid.close_approach_data[0].close_approach_date,
            is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid
        })));

    return asteroids;
}
function filterAsteroidsBySize(asteroids, size) {
    if (size === 'small') {
        return asteroids.filter(asteroid => asteroid.size < 1);
    } else if (size === 'medium') {
        return asteroids.filter(asteroid => asteroid.size >= 1 && asteroid.size < 10);
    } else if (size === 'large') {
        return asteroids.filter(asteroid => asteroid.size >= 10);
    } else {
        return asteroids;
    }
}
function sortAsteroids(asteroids, sortBy) {
    return asteroids.sort((a, b) => {
        return a[sortBy].localeCompare(b[sortBy]);
    });
}