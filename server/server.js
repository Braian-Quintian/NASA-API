import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json());
const configuracion = JSON.parse(process.env.CONFIG);

const apiKey = 'FkIw9aQ7EJrI27ZoSRVSNvn5Djo4RYYoRw6iRmhZ';
const startDate = '2023-07-05';
const endDate = '2023-07-10';

// RESPUESTA DE LA PETICION DE ASTEROIDS
app.get('/asteroids', async (req, res) => {
  try {
    const asteroids = await fetchAsteroidsData();
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(asteroids));
  } catch (error) {
    res.end('Error al obtener los datos de los asteroides');
  }
});

// PETICION DE LA DATA DESDE LA API DE LA NASA
const fetchAsteroidsData = async () => {
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

app.listen(configuracion.port, configuracion.hostname, () => {
  console.log(`http://${configuracion.hostname}:${configuracion.port}`);
});