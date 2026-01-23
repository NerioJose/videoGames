const { Videogame, Genres } = require('../db');

const postVideoGame = async (req, res) => {
  try {
    const { name, description, platforms, image, released, rating, genres } =
      req.body;

    // Acomodamos el array de plataformas:
    const platformsGroup = platforms.join(', ');

    // Validamos que estén todos los datos completos
    if (
      !name ||
      !description ||
      !platforms ||
      !released ||
      !rating ||
      !genres
    ) {
      return res
        .status(400)
        .json({ error: 'Se requieren todos los campos obligatorios' });
    }

    // Creamos el videojuego en la base de datos
    const newGame = await Videogame.create({
      name,
      description,
      platforms: platformsGroup,
      image,
      released,
      rating,
    });

    // Aquí relacionamos los videojuegos con los géneros
    const genreInstances = await Genres.findAll({
      where: {
        name: genres,
      },
    });
    await newGame.addGenres(genreInstances);

    // Obtenemos el videojuego creado junto con sus géneros asociados
    const createdGameWithGenres = await Videogame.findByPk(newGame.id, {
      include: Genres,
    });

    return res.status(201).json({
      ...createdGameWithGenres.toJSON(),
      genres: createdGameWithGenres.Genres.map(g => ({ id: g.id, name: g.name })),
      createdInDb: true
    });
  } catch (error) {
    console.error('Error al crear el videojuego:', error);
    res.status(500).json({ error: 'Error al crear el videojuego' });
  }
};

module.exports = postVideoGame;
