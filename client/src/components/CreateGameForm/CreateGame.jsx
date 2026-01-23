import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postVideoGame } from '../../redux/action';
import validation from './validation';
import style from './createGame.module.css';
import { useHistory } from 'react-router-dom';

const platformsOptions = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'iOS', 'Android'];
const genresOptions = ['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Massively Multiplayer', 'Sports', 'Fighting'];

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
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors(validation(newFormData));
  };

  const handleToggleChip = (name, value) => {
    const currentValues = formData[name];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    const newFormData = { ...formData, [name]: newValues };
    setFormData(newFormData);
    setErrors(validation(newFormData));
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
          setFormData(initialFormData);
          setErrors({});
          setSuccessMessage('QUEST COMPLETED: Game Created');
          setTimeout(() => {
            setSuccessMessage('');
            history.push('/home');
          }, 3000);
        })
        .catch((error) => {
          console.error('[CRITICAL] Failed to create game:', error);
        });
    }
  };

  return (
    <div className={style.createGameContainer}>
      {successMessage && (
        <div className={style.successMessage}>{successMessage}</div>
      )}

      <div className={style.pageHeader}>
        <h1 className={style.title}>Forge Legend</h1>
        <div className={style.subtitle}>[ SESSION_SECURE ] initializing_game_creation_sequence...</div>
      </div>

      <div className={style.mainGrid}>
        {/* Form Section */}
        <div className={style.formCard}>
          <form className={style.containForm} onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label>Game ID \ Name</label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='ASSIGN IDENTITY...'
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && <span className={style.error}>{errors.name}</span>}
            </div>

            <div className={style.inputGroup}>
              <label>Visual Asset \ URL</label>
              <input
                id='image'
                name='image'
                placeholder='HTTP://EXTERNAL_LINK...'
                value={formData.image}
                onChange={handleChange}
              />
              {errors.image && <span className={style.error}>{errors.image}</span>}
            </div>

            <div className={style.gridGroup}>
              <div className={style.inputGroup}>
                <label>Launch Date</label>
                <input
                  type='date'
                  name='released'
                  id='released'
                  value={formData.released}
                  onChange={handleChange}
                />
                {errors.released && <span className={style.error}>{errors.released}</span>}
              </div>

              <div className={style.inputGroup}>
                <label>Power Level \ Rating</label>
                <input
                  type='number'
                  name='rating'
                  id='rating'
                  step='0.1'
                  min='1'
                  max='5'
                  placeholder='5.0'
                  value={formData.rating}
                  onChange={handleChange}
                />
                {errors.rating && <span className={style.error}>{errors.rating}</span>}
              </div>
            </div>

            <div className={style.inputGroup}>
              <label>Compatible Platforms</label>
              <div className={style.chipsContainer}>
                {platformsOptions.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    className={`${style.chip} ${formData.platforms.includes(platform) ? style.activeChip : ''}`}
                    onClick={() => handleToggleChip('platforms', platform)}
                  >
                    {platform}
                  </button>
                ))}
              </div>
              {errors.platforms && <span className={style.error}>{errors.platforms}</span>}
            </div>

            <div className={style.inputGroup}>
              <label>Category Tags \ Genres</label>
              <div className={style.chipsContainer}>
                {genresOptions.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={`${style.chip} ${formData.genres.includes(genre) ? style.activeChip : ''}`}
                    onClick={() => handleToggleChip('genres', genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              {errors.genres && <span className={style.error}>{errors.genres}</span>}
            </div>

            <div className={style.inputGroup}>
              <label>Game Chronicles \ Description</label>
              <textarea
                id='description'
                name='description'
                placeholder='INITIALIZE LORE...'
                value={formData.description}
                onChange={handleChange}
                className={style.textarea}
              />
              {errors.description && <span className={style.error}>{errors.description}</span>}
            </div>

            <button
              type='submit'
              className={style.bottonCreate}
              disabled={isSubmitDisabled}
            >
              EXECUTE_CREATE.EXE
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className={style.previewCard}>
          <div className={style.previewTitle}>Quest Preview</div>
          <div className={style.mockCard}>
            <div className={style.mockImage}>
              {formData.image ? (
                <img src={formData.image} alt="preview" />
              ) : (
                <div className={style.imagePlaceholder}>
                  <span>[ NO DATA ]</span>
                </div>
              )}
            </div>
            <div className={style.mockInfo}>
              <div className={style.mockHeader}>
                <h2 className={style.mockName}>{formData.name || 'NEW_GAME'}</h2>
                <span className={style.mockRating}>{formData.rating || '0.0'} ★</span>
              </div>
              <p className={style.mockMeta}>
                RELEASE: {formData.released || 'NONE'} | GENRE: {formData.genres[0] || 'TBD'}
              </p>
              <p className={style.mockDescription}>
                {formData.description || 'System awaiting data input... Initialize description sequence.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
