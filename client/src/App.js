import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllGames, getAllGenres } from './redux/action';
import routered from './helpers/Routes.helper';

//components
import Bienvenida from './components/bienvenida/bienvenida';
import Cards from './components/Cards/Cards';
import Navigation from './components/Navigation/Navigation';
import Pagination from './components/Pagination/Pagination';
import Detail from './components/DetailVideoGame/Detail';
import CreateGame from './components/CreateGameForm/CreateGame';
import Footer from './components/Footer/Footer';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <div className='main-container'>
      <Router>
        <Route
          path='/'
          render={({ location }) => {
            const isBienvenida = location.pathname === routered.Bienvenida;
            return (
              <>
                {!isBienvenida && <Navigation />}
                <main className={!isBienvenida ? 'content-wrapper fade-in' : ''}>
                  <Switch>
                    <Route
                      exact
                      path={routered.Bienvenida}
                      component={Bienvenida}
                    />

                    <Route exact path={routered.Home}>
                      <Cards />
                      <Pagination />
                    </Route>

                    <Route exact path={routered.create} component={CreateGame} />

                    <Route exact path={routered.detailGame} component={Detail} />
                  </Switch>
                </main>
                {!isBienvenida && <Footer />}
              </>
            );
          }}
        />
      </Router>
    </div>
  );
};

export default App;
