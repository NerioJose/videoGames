// reducer.js
import {
  GET_ALL_GAMES,
  GET_ALL_GENRES,
  SEARCH_BY_NAME,
  SET_CURRENT_PAGE,
  SET_ITEMS,
  SET_TOTAL_PAGES,
  SET_LOADING,
  GET_DETAIL,
  CLEAR_DETAIL,
  POST_VIDEO_GAME,
  PAGE_SIZE,
  FILTER_AND_SORT,
} from './action';

const initialState = {
  introGames: [],
  genres: [],
  currentPage: 1,
  totalPages: 1,
  items: [],
  gamesByName: [],
  loading: false,
  detailGame: null,
  createdGame: null,
  filteredVideoGames: [],
  genre: 'All',
  source: 'All',
  sortOrder: 'asc',
  sortBy: 'name',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        introGames: payload,
        filteredVideoGames: payload,
        items: payload.slice(0, PAGE_SIZE),
        totalPages: Math.ceil(payload.length / PAGE_SIZE),
        loading: false
      };

    case GET_ALL_GENRES:
      return { ...state, genres: payload };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };

    case SET_TOTAL_PAGES:
      return { ...state, totalPages: payload };

    case SET_ITEMS:
      return { ...state, items: payload };

    case SET_LOADING:
      return { ...state, loading: payload };

    case GET_DETAIL:
      return {
        ...state,
        detailGame: payload,
        loading: false,
      };

    case CLEAR_DETAIL:
      return { ...state, detailGame: null };

    case POST_VIDEO_GAME: {
      const updatedIntroGames = [payload, ...state.introGames];
      let newFiltered = [...updatedIntroGames];

      // Re-aplicar filtros actuales al nuevo set para que no "desaparezca" el juego
      if (state.genre !== 'All') {
        newFiltered = newFiltered.filter(g =>
          (g.genres && g.genres.some(gen => gen.name === state.genre)) ||
          (g.Genres && g.Genres.some(gen => gen.name === state.genre))
        );
      }
      if (state.source !== 'All') {
        newFiltered = newFiltered.filter(g =>
          state.source === 'API' ? !g.createdInDb : g.createdInDb
        );
      }

      newFiltered.sort((a, b) => {
        if (state.sortBy === 'name') {
          return state.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return state.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      });

      return {
        ...state,
        createdGame: payload,
        introGames: updatedIntroGames,
        filteredVideoGames: newFiltered,
        items: newFiltered.slice(0, PAGE_SIZE),
        totalPages: Math.ceil(newFiltered.length / PAGE_SIZE),
        currentPage: 1, // Reiniciar a la primera página para ver el juego recién creado
      };
    }

    case FILTER_AND_SORT: {
      const { genre, source, sortOrder, sortBy, games } = payload;
      let filtered = [...games];

      if (genre !== 'All') {
        filtered = filtered.filter(g =>
          (g.genres && g.genres.some(gen => gen.name === genre)) ||
          (g.Genres && g.Genres.some(gen => gen.name === genre))
        );
      }
      if (source !== 'All') {
        filtered = filtered.filter(g =>
          source === 'API' ? !g.createdInDb : g.createdInDb
        );
      }

      filtered.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      });

      return {
        ...state,
        genre,
        source,
        sortOrder,
        sortBy,
        filteredVideoGames: filtered,
        items: filtered.slice(0, PAGE_SIZE),
        totalPages: Math.ceil(filtered.length / PAGE_SIZE),
        currentPage: 1,
      };
    }

    case SEARCH_BY_NAME: {
      const searchResults = payload.results;
      return {
        ...state,
        gamesByName: searchResults,
        filteredVideoGames: searchResults,
        items: searchResults.slice(0, PAGE_SIZE),
        totalPages: Math.ceil(searchResults.length / PAGE_SIZE),
        currentPage: 1,
        genre: 'All',
        source: 'All'
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
