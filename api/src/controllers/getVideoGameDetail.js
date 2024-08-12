const axios = require('axios');
require('dotenv').config();
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;
const { validate: isUUID } = require('uuid');

const getVideoGameDetail = async (req, res) => {
  const { id } = req.params;

  try {
    let videoGameDetail;

    if (isUUID(id)) {
      const dbVideoGame = await Videogame.findByPk(id, {
        include: Genres,
      });

      if (dbVideoGame) {
        videoGameDetail = dbVideoGame.toJSON();
        videoGameDetail.genres = dbVideoGame.Genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));
      } else {
        return res
          .status(404)
          .json({ error: 'Videojuego no encontrado en la base de datos' });
      }
    } else {
      const apiResponse = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      const apiData = apiResponse.data;

      videoGameDetail = {
        id: apiData.id,
        name: apiData.name,
        description: apiData.description_raw || 'No description available',
        platforms: apiData.platforms.map((p) => p.platform.name).join(', '),
        image: apiData.background_image,
        released: apiData.released,
        rating: apiData.rating,
        genres: apiData.genres.map((g) => ({ id: g.id, name: g.name })),
      };
    }

    res.status(200).json(videoGameDetail);
  } catch (error) {
    console.error('Error al obtener los detalles del videojuego:', error);
    res
      .status(500)
      .json({ error: 'Error al obtener los detalles del videojuego' });
  }
};

module.exports = getVideoGameDetail;
