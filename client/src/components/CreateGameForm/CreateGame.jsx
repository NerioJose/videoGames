import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postVideoGame } from '../../redux/action';
import validation from './validation';
import style from './createGame.module.css';
import { useHistory } from 'react-router-dom';

const platformsOptions = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'];
const genresOptions = ['Action', 'Adventure', 'RPG', 'Simulation', 'Strategy'];

const CreateGame = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialFormData = {
    name: '',
    description: '',
    platforms: [],
    image: '',
    released: '',
    rating: '',
    genres: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, options } = e.target;

    if (name === 'platforms' || name === 'genres') {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));

      setErrors(validation({ ...formData, [name]: selectedValues }));
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });

      setErrors(validation({ ...formData, [name]: e.target.value }));
    }
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const hasEmptyFields = Object.values(formData).some((value) =>
      Array.isArray(value) ? value.length === 0 : !value
    );
    setIsSubmitDisabled(hasErrors || hasEmptyFields);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      dispatch(postVideoGame(formData))
        .then(() => {
          setFormData(initialFormData); // Reset form data
          setErrors({}); // Clear errors
          setSuccessMessage('Videojuego creado correctamente'); // Seteamos el mensaje de éxito
          setTimeout(() => {
            setSuccessMessage(''); // limpiamos el mensaje antes del redireccionamiento
            history.push('/home'); // Redirecionamiento a /home
            window.location.reload();
          }, 5000); // mostramos por 8 segundos
        })
        .catch((error) => {
          console.error('Error al crear el videojuego:', error);
        });
    }
  };

  return (
    <div className={style.createGameContainer}>
      {successMessage && (
        <div className={style.successMessage}>{successMessage}</div>
      )}
      <h1 className={style.title}>Create a New Game</h1>
      <div className={style.imgFondo}>
        <form className={style.containForm} onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className={style.errorName}>{errors.name}</p>}

          <label htmlFor='description'>Description Game:</label>
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            required
            className={style.textarea}
          />
          {errors.description && (
            <p className={style.errorDescription}>{errors.description}</p>
          )}
          <label htmlFor='image'>Image</label>
          <input
            id='image'
            name='image'
            placeholder='URL Image'
            value={formData.image}
            onChange={handleChange}
            required
            className={style.imageInput}
          />
          {errors.image && <p className={style.errorImage}>{errors.image}</p>}

          <label htmlFor='platforms'>Platforms:</label>
          <select
            name='platforms'
            id='platforms'
            multiple
            value={formData.platforms}
            onChange={handleChange}
            required
          >
            {platformsOptions.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {errors.platforms && (
            <p className={style.errorPlatforms}>{errors.platforms}</p>
          )}

          <label htmlFor='genres'>Genres:</label>
          <select
            name='genres'
            id='genres'
            multiple
            value={formData.genres}
            onChange={handleChange}
            required
          >
            {genresOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genres && (
            <p className={style.errorGenres}>{errors.genres}</p>
          )}

          <label htmlFor='released'>Released Date:</label>
          <input
            type='date'
            name='released'
            id='released'
            value={formData.released}
            onChange={handleChange}
            required
          />
          {errors.released && (
            <p className={style.errorReleased}>{errors.released}</p>
          )}

          <label htmlFor='rating'>Rating:</label>
          <input
            type='number'
            name='rating'
            id='rating'
            placeholder='Rating'
            value={formData.rating}
            onChange={handleChange}
            required
          />
          {errors.rating && (
            <p className={style.errorRating}>{errors.rating}</p>
          )}

          <button
            type='submit'
            className={style.bottonCreate}
            disabled={isSubmitDisabled}
          >
            Create Game
          </button>
        </form>
      </div>
      <div
        className={`${style.selectedOptions} ${
          formData.platforms.length > 0 || formData.genres.length > 0
            ? style.visible
            : ''
        }`}
      >
        {formData.platforms.length > 0 && (
          <div>
            <h2>Selected Platforms:</h2>
            <ul>
              {formData.platforms.map((platform) => (
                <li key={platform}>{platform}</li>
              ))}
            </ul>
          </div>
        )}
        {formData.genres.length > 0 && (
          <div>
            <h2>Selected Genres:</h2>
            <ul>
              {formData.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGame;
