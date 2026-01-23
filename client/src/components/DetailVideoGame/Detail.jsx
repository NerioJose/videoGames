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
        <div className={style.loadingText}>Synchronizing_Tactical_Data...</div>
      </div>
    );
  }

  if (!gameDetail || Object.keys(gameDetail).length === 0) {
    return (
      <div className={style.errorMessage}>[ ERROR ] LINK_NOT_FOUND: Subject data missing.</div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.detailCard}>
        <div className={style.imageSection}>
          <img
            className={style.detailImg}
            src={gameDetail.image}
            alt={gameDetail.name}
          />
          <div className={style.overlay}></div>
        </div>

        <div className={style.infoSection}>
          <div className={style.header}>
            <span className={style.idTag}>INTEL_ID_#{id}</span>
            <h1 className={style.name}>{gameDetail.name}</h1>
          </div>

          <div className={style.metaGrid}>
            <div className={style.metaItem}>
              <h4>Initial Deployment</h4>
              <p>{gameDetail.released || 'CLASSIFIED'}</p>
            </div>
            <div className={style.metaItem}>
              <h4>Power Rating</h4>
              <p>{gameDetail.rating || '0.0'} ★</p>
            </div>
            <div className={style.metaItem}>
              <h4>Target Platforms</h4>
              <p>{gameDetail.platforms || 'GENERAL_HARDWARE'}</p>
            </div>
            <div className={style.metaItem}>
              <h4>Mission Genres</h4>
              <p>{gameDetail.genres?.map((g) => g.name || g).join(', ') || 'UNCATEGORIZED'}</p>
            </div>
          </div>

          <div className={style.description}>
            <h3>Tactical Chronicles</h3>
            <div dangerouslySetInnerHTML={{ __html: gameDetail.description }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
