import axios from 'axios';

// Constantes de acciones
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_ITEMS = 'SET_ITEMS';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const SET_LOADING = 'SET_LOADING';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const POST_VIDEO_GAME = 'POST_VIDEO_GAME';
//! filtros:
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET';
export const SORT_BY_RATING = 'SORT_BY_RATING';
//!filtrado en conjunto:
export const FILTER_AND_SORT = 'FILTER_AND_SORT';

export const PAGE_SIZE = 15;

// Utilizamos una variable de entorno para la URL base de la API
const API_URL = process.env.REACT_APP_API_URL || 'https://videogames-production-a5a0.up.railway.app';

// Acción para manejar el estado de "cargando"
export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

// Acción para obtener todos los videojuegos
export const getAllGames = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/videogames`);
    const videoGames = response.data;

    dispatch({ type: GET_ALL_GAMES, payload: videoGames });
    dispatch({
      type: SET_TOTAL_PAGES,
      payload: Math.ceil(videoGames.length / PAGE_SIZE),
    });
    dispatch(setItems(videoGames.slice(0, PAGE_SIZE)));
    dispatch({ type: SET_CURRENT_PAGE, payload: 1 });
  } catch (error) {
    console.error('Error fetching video games from backend:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Acción para setear la página actual
export const setCurrentPage = (page) => (dispatch, getState) => {
  const { introGames } = getState(); // Obtener introGames del estado

  const startIndex = (page - 1) * PAGE_SIZE;
  const items = introGames.slice(startIndex, startIndex + PAGE_SIZE);

  dispatch({ type: SET_CURRENT_PAGE, payload: page });
  dispatch({ type: SET_ITEMS, payload: items });
};

// Acción para setear los ítems en la vista
export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    payload: items,
  };
};

// Acción para obtener todos los géneros
export const getAllGenres = () => (dispatch) => {
  return axios
    .get(`${API_URL}/genres`)
    .then((res) => {
      dispatch({ type: GET_ALL_GENRES, payload: res.data });
    })
    .catch((error) => {
      console.error('Error fetching genres:', error);
    });
};

// Acción para buscar videojuegos por nombre
export const searchByName = (name) => {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${API_URL}/videogames/name?search=${name}`);
      const results = res.data;
      const totalPages = Math.ceil(results.length / PAGE_SIZE);
      dispatch({ type: SEARCH_BY_NAME, payload: { results, totalPages } });

      const { genre, source, sortOrder, sortBy } = getState();
      dispatch(filterAndSort(genre, source, sortOrder, sortBy, results));
    } catch (error) {
      console.error('Error searching by name:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Acción para obtener los detalles de un videojuego
export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/videogames/${id}`);
      dispatch({ type: GET_DETAIL, payload: response.data });
    } catch (error) {
      console.error('Error fetching game details:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Acción para limpiar el detalle
export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

// Acción para crear un nuevo videojuego
export const postVideoGame = (gameData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/videogames/create`, gameData);
    dispatch({
      type: POST_VIDEO_GAME,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error posting video game:', error);
  }
};

// Filtros y ordenamientos
export const filterByGenre = (genre) => ({
  type: FILTER_BY_GENRE,
  payload: genre,
});

export const filterBySource = (source) => ({
  type: FILTER_BY_SOURCE,
  payload: source,
});

export const sortByAlphabet = (order) => ({
  type: SORT_BY_ALPHABET,
  payload: order,
});

export const sortByRating = (order) => ({
  type: SORT_BY_RATING,
  payload: order,
});

// Acción para filtrar y ordenar los videojuegos
export const filterAndSort = (genre, source, sortOrder, sortBy, games = null) => (dispatch, getState) => {
  const stateGames = getState().introGames;
  const gamesToFilterAndSort = games || stateGames;

  dispatch({
    type: FILTER_AND_SORT,
    payload: { genre, source, sortOrder, sortBy, games: gamesToFilterAndSort },
  });
};
