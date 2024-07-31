import React, { useEffect } from 'react';
import style from './bienvenida.module.css';
import imgFondo from '../../media/maquinasAnimado.gif';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllGames } from '../../redux/action';

// landing page...
const Bienvenida = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <img src={imgFondo} alt='gamer' className={style.sobrefondo} />
      <Link to={'/home'}>
        {' '}
        <button type='text' className={style.startButton}>
          Press Start
        </button>
      </Link>
    </div>
  );
};

export default Bienvenida;
