require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Genres } = require('../db');

const getAllGenres = async (req, res) => {
  try {
    // obtenemos todos los generos de la api
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const apiGenres = response.data.results.map((g) => {
      return {
        name: g.name,
      };
    });

    // verificamos si la base de datos esta vacia

    const genresFromDB = await Genres.findAll();

    if (genresFromDB.length === 0) {
      await Genres.bulkCreate(apiGenres);
    }

    const genres = await Genres.findAll();

    //devolvemos los generos como respuesta.

    res.status(200).json(genres);
  } catch (error) {
    console.error('Error al buscar los generos:', error);
    res.status(500).json({ error: 'Error al buscar los generos' });
  }
};

module.exports = getAllGenres;
