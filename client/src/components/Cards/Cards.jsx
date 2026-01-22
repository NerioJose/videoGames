import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './cards.module.css';
import imgLoading from '../../media/loading.gif';

const Cards = () => {
  const loading = useSelector((state) => state.loading);
  const currentPage = useSelector((state) => state.currentPage);
  const introGames = useSelector((state) => state.introGames);
  const filteredVideoGames = useSelector((state) => state.filteredVideoGames);
  const gamesByName = useSelector((state) => state.gamesByName);
  const pageSize = 15; // Tamaño de la página

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <img src={imgLoading} alt='loading...' className={style.imgLoading} />
      </div>
    );
  }

  // Determinar qué conjunto de juegos mostrar
  const gamesToDisplay =
    gamesByName.length > 0
      ? gamesByName
      : filteredVideoGames.length > 0
        ? filteredVideoGames
        : introGames;

  // Calculamos los índices de inicio y fin para los juegos de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, gamesToDisplay.length);
  const gamesToShow = Array.isArray(gamesToDisplay)
    ? gamesToDisplay.slice(startIndex, endIndex)
    : [];

  if (!Array.isArray(gamesToShow) || gamesToShow.length === 0) {
    return (
      <div className={style.container}>
        <p style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>
          No games found. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {gamesToShow.map((game) => (
        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          background_image={game.background_image || game.image}
          // Nos aseguramos de que ambos genres y Genres sean arrays antes de acceder a ellos
          genres={(game.genres || []).concat(game.Genres || [])}
        />
      ))}
    </div>
  );
};

export default Cards;
