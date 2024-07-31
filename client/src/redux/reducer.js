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
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  SORT_BY_ALPHABET,
  SORT_BY_RATING,
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
      return { ...state, introGames: payload };

    case GET_ALL_GENRES:
      return { ...state, genres: payload };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };

    case SET_TOTAL_PAGES:
      return { ...state, totalPages: payload };

    case SET_ITEMS:
      return { ...state, items: payload };

    case SEARCH_BY_NAME:
      const searchResults = payload.results;
      const searchTotalPages = Math.ceil(searchResults.length / PAGE_SIZE);

      return {
        ...state,
        gamesByName: searchResults,
        totalPages: searchTotalPages,
        currentPage: 1,
        items: searchResults.slice(0, PAGE_SIZE),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detailGame: payload,
        loading: false,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detailGame: null,
      };
    case POST_VIDEO_GAME:
      return {
        ...state,
        createdGame: payload,
      };
    case FILTER_BY_GENRE:
      const filteredByGenre =
        payload === 'All'
          ? state.introGames
          : state.introGames.filter((game) => {
              // Verificar si el juego coincide con el género seleccionado
              const matchGenre =
                payload === 'All' ||
                (game.genres &&
                  game.genres.some((genre) => genre.name === payload)) ||
                (game.Genres &&
                  game.Genres.some((genre) => genre.name === payload));
              return matchGenre;
            });

      const totalPagesGenre = Math.ceil(filteredByGenre.length / PAGE_SIZE);
      return {
        ...state,
        genre: payload,
        filteredVideoGames: payload === 'All' ? [] : filteredByGenre,
        totalPages: totalPagesGenre,
      };

    case FILTER_BY_SOURCE:
      let filteredBySource;
      if (payload === 'All') {
        // Si se selecciona 'All', mostrar todos los juegos
        filteredBySource = state.introGames;
      } else {
        // Filtrar los juegos según el tipo de ID
        filteredBySource = state.introGames.filter((game) =>
          payload === 'API'
            ? typeof game.id === 'number'
            : typeof game.id !== 'number'
        );
      }

      if (filteredBySource.length === 0) {
        filteredBySource = [];
      }

      const totalPagesSource = Math.ceil(filteredBySource.length / PAGE_SIZE);
      return {
        ...state,
        source: payload,
        filteredVideoGames: payload === 'All' ? [] : filteredBySource,
        totalPages: totalPagesSource,
      };
    case SORT_BY_ALPHABET:
      const sortedAlphabetically = [...state.introGames].sort((a, b) =>
        payload === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      const totalPagesAlphabet = Math.ceil(
        sortedAlphabetically.length / PAGE_SIZE
      );
      return {
        ...state,
        sortOrder: payload,
        introGames: sortedAlphabetically,
        totalPages: totalPagesAlphabet,
      };

    case SORT_BY_RATING:
      const sortedByRating = [...state.introGames].sort((a, b) =>
        payload === 'asc' ? a.rating - b.rating : b.rating - a.rating
      );
      const totalPagesRating = Math.ceil(sortedByRating.length / PAGE_SIZE);
      return {
        ...state,
        sortOrder: payload,
        introGames: sortedByRating,
        totalPages: totalPagesRating,
      };
    case FILTER_AND_SORT:
      const { genre, source, sortOrder, sortBy, games } = payload;
      let filteredGames = [...games];

      // Filtrar por género
      if (genre !== 'All') {
        filteredGames = filteredGames.filter(
          (game) =>
            (game.genres && game.genres.some((g) => g.name === genre)) ||
            (game.Genres && game.Genres.some((g) => g.name === genre))
        );
      }

      // Filtrar por fuente
      if (source !== 'All') {
        filteredGames = filteredGames.filter((game) =>
          source === 'API'
            ? typeof game.id === 'number'
            : typeof game.id !== 'number'
        );
      }

      // Ordenar
      if (sortBy === 'name') {
        filteredGames = filteredGames.sort((a, b) =>
          sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      } else if (sortBy === 'rating') {
        filteredGames = filteredGames.sort((a, b) =>
          sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
        );
      }

      const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);
      return {
        ...state,
        genre,
        source,
        sortOrder,
        sortBy,
        filteredVideoGames: filteredGames,
        totalPages,
        currentPage: 1,
        items: filteredGames.slice(0, PAGE_SIZE),
      };
    default:
      return state;
  }
};

export default rootReducer;
