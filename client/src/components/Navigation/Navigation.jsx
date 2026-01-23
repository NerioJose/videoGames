import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import { filterAndSort, getAllGames } from '../../redux/action';
import style from './navigation.module.css';
import { useHistory } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const genre = useSelector((state) => state.genre);
  const source = useSelector((state) => state.source);
  const sortOrder = useSelector((state) => state.sortOrder);
  const sortBy = useSelector((state) => state.sortBy);

  const handleHome = () => {
    dispatch(getAllGames());
    history.push('/home');
  };

  const handleFilterAndSort = (
    newGenre,
    newSource,
    newSortOrder,
    newSortBy
  ) => {
    dispatch(filterAndSort(newGenre, newSource, newSortOrder, newSortBy));
  };

  const handleFilterByGenre = (event) => {
    handleFilterAndSort(event.target.value, source, sortOrder, sortBy);
  };

  const handleFilterBySource = (event) => {
    handleFilterAndSort(genre, event.target.value, sortOrder, sortBy);
  };

  const handleSortByAlphabet = (event) => {
    handleFilterAndSort(genre, source, event.target.value, 'name');
  };

  const handleSortByRating = (event) => {
    handleFilterAndSort(genre, source, event.target.value, 'rating');
  };

  return (
    <div className={style.container}>
      <div className={style.navLinks}>
        <Link to={'/home'} className={style.btnHome}>
          <button className={style.buttonHome} onClick={handleHome}>
            Home
          </button>
        </Link>
        <Link to={'/videogames/create'} className={style.btnHome}>
          <button className={style.buttonCreate}>Create</button>
        </Link>
      </div>

      <SearchBar />

      {location.pathname === '/home' && (
        <div className={style.filterSection}>
          <div className={style.filterOptions}>
            <h3>Genre</h3>
            <div className={style.filters}>
              <select onChange={handleFilterByGenre} value={genre}>
                <option value='All'>All</option>
                <option value='Action'>Action</option>
                <option value='Indie'>Indie</option>
                <option value='Adventure'>Adventure</option>
                <option value='RPG'>RPG</option>
                <option value='Strategy'>Strategy</option>
                <option value='Shooter'>Shooter</option>
                <option value='Casual'>Casual</option>
                <option value='Simulation'>Simulation</option>
                <option value='Puzzle'>Puzzle</option>
                <option value='Arcade'>Arcade</option>
                <option value='Platformer'>Platformer</option>
                <option value='Racing'>Racing</option>
                <option value='Massively Multiplayer'>Massively Multiplayer</option>
                <option value='Sports'>Sports</option>
                <option value='Fighting'>Fighting</option>
              </select>
            </div>
          </div>
          <div className={style.filterOptions}>
            <h3>Source</h3>
            <div className={style.filters}>
              <select onChange={handleFilterBySource} value={source}>
                <option value='All'>All</option>
                <option value='API'>API</option>
                <option value='Database'>Database</option>
              </select>
            </div>
          </div>
          <div className={style.sortOptions}>
            <h3>Sort</h3>
            <div className={style.filters}>
              <select onChange={handleSortByAlphabet} value={sortBy === 'name' ? sortOrder : ''}>
                <option value='' disabled hidden>A-Z</option>
                <option value='asc'>Ascendente (A-Z)</option>
                <option value='desc'>Descendente (Z-A)</option>
              </select>
              <select onChange={handleSortByRating} value={sortBy === 'rating' ? sortOrder : ''}>
                <option value='' disabled hidden>Rating</option>
                <option value='asc'>Rating ↑</option>
                <option value='desc'>Rating ↓</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className={style.hudDecoration}></div>
    </div>
  );
};

export default Navigation;
