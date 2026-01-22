// controllers/getAllVideoGames.js
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db'); // Importa el modelo de tu base de datos

// Función para obtener los primeros 100 videojuegos de la API
const getFirst100VideoGamesFromAPI = async () => {
  const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let allVideoGames = [];
  let page = 1;
  const totalPages = 5; // Para obtener 100 juegos, necesitamos 5 páginas (15 juegos por página)

  try {
    // Generar array de promesas para las 5 páginas
    const promises = [];
    for (let i = 1; i <= totalPages; i++) {
      promises.push(axios.get(`${URL}&page=${i}`));
    }

    // Ejecutar todas las peticiones en paralelo
    const responses = await Promise.all(promises);

    // Procesar resultados
    responses.forEach(response => {
      const videoGames = response.data.results.map((game) => ({
        id: game.id,
        name: game.name,
        description: game.description || 'No description available',
        platforms: game.platforms.map((p) => p.platform.name).join(', '),
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres.map((g) => ({ id: g.id, name: g.name })),
      }));
      allVideoGames = [...allVideoGames, ...videoGames];
    });

    return allVideoGames;
  } catch (error) {
    console.error('Error fetching first 100 video games from API:', error);
    throw new Error('Error fetching first 100 video games from API');
  }
};

const getAllVideoGames = async (req, res) => {
  try {
    // Obtener los videojuegos de la base de datos
    const dbVideoGames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ['name'],
      },
    });

    // Obtener los primeros 100 videojuegos de la API
    console.log("Fetching games from API... Key present:", !!process.env.API_KEY);
    const apiVideoGames = await getFirst100VideoGamesFromAPI();
    console.log(`Fetched ${apiVideoGames.length} games from external API`);

    // Combinar los resultados de la base de datos y la API
    const allVideoGames = [...dbVideoGames, ...apiVideoGames];

    // Devolver los videojuegos combinados como respuesta
    res.status(200).json(allVideoGames);
  } catch (error) {
    console.error('Error fetching all video games:', error);
    res.status(500).json({ error: 'Error fetching all video games' });
  }
};

module.exports = getAllVideoGames;
