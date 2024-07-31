// routes/videogames.js (o donde sea que esté definido tu controlador)
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame } = require('../db');
const { Op } = require('sequelize');

const getVideoGameName = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda' });
    }

    // Obtener los primeros 100 juegos de la base de datos y la API
    const dbResults = await Videogame.findAll({ limit: 100 });
    const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`);
    const apiResults = response.data.results;

    // Combinar los resultados de la base de datos y la API
    const allResults = [...dbResults, ...apiResults];

    // Filtrar los resultados según el término de búsqueda
    const filteredResults = allResults.filter(game => 
      game.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredResults.length > 0) {
      return res.status(200).json(filteredResults);
    } else {
      return res.status(404).json({
        message: 'No se encontraron videojuegos con el término de búsqueda proporcionado',
      });
    }
  } catch (error) {
    console.error('Error al buscar videojuegos por nombre:', error);
    return res.status(500).json({ error: 'Error al buscar videojuegos por nombre.' });
  }
};

module.exports = getVideoGameName;
