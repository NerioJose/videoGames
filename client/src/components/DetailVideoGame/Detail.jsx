import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './detail.module.css';
import imgLoading from '../../media/loading.gif';
import { clearDetail, getDetail, setLoading } from '../../redux/action';

const Detail = () => {
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.detailGame);
  const loading = useSelector((state) => state.loading);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      dispatch(getDetail(id));
    }

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <img src={imgLoading} alt='loading...' className={style.imgLoading} />
      </div>
    );
  }

  if (!gameDetail || Object.keys(gameDetail).length === 0) {
    return (
      <div className={style.errorMessage}>Detalle de juego no encontrado</div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.detailContainer} key={id}>
        <img
          className={style.detailImg}
          src={gameDetail.image}
          alt='detailImg'
        />
        <div className={style.infoColumn}>
          <h1 className={style.name}>{gameDetail.name}</h1>

          <div className={style.descriptFinal}>
            <p className={style.platforms}>
              <span>Platforms: </span>{gameDetail.platforms}
            </p>
            <p className={style.date}>
              <span>Released: </span>{gameDetail.released}
            </p>
            <p className={style.rating}>
              <span>Rating: </span>{gameDetail.rating}
            </p>
            <p className={style.genres}>
              <span>Genres: </span>{gameDetail.genres?.map((genre) => genre.name).join(', ')}
            </p>
          </div>

          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: gameDetail.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
