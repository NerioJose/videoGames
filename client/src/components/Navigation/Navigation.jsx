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
    window.location.reload();
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
      <Link to={'/home'} className={style.btnHome}>
        <button className={style.buttonHome} onClick={handleHome}>
          Home
        </button>
      </Link>
      <Link to={'/videogames/create'} className={style.btnHome}>
        <button className={style.buttonCreate}>Create New Game</button>
      </Link>
      <SearchBar />
      {location.pathname === '/home' && (
        <>
          <div className={style.filterOptions}>
            <h3>Filter by Genre:</h3>
            <select onChange={handleFilterByGenre}>
              <option value='All'>All</option>
              <option value='Action'>Action</option>
              <option value='Adventure'>Adventure</option>
              <option value='RPG'>RPG</option>
              <option value='Simulation'>Simulation</option>
              <option value='Strategy'>Strategy</option>
            </select>
          </div>
          <div className={style.filterOptions}>
            <h3>Filter by Source:</h3>
            <select onChange={handleFilterBySource}>
              <option value='All'>All</option>
              <option value='API'>API</option>
              <option value='Database'>Database</option>
            </select>
          </div>
          <div className={style.sortOptions}>
            <h3>Sort by:</h3>
            <div className={style.filters}>
              <select onChange={handleSortByAlphabet}>
                <option value='asc'>Alphabet (A-Z)</option>
                <option value='desc'>Alphabet (Z-A)</option>
              </select>
              <select onChange={handleSortByRating}>
                <option value='asc'>Rating (ascendente)</option>
                <option value='desc'>Rating (descendente)</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
