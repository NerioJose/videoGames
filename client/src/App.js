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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Route
          path='/'
          render={({ location }) => (
            <>
              {location.pathname !== routered.Bienvenida && (
                <>
                  <Navigation />
                  <Footer />
                </>
              )}
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
            </>
          )}
        />
      </Router>
    </div>
  );
};

export default App;
