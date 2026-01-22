import { Link } from 'react-router-dom';
import style from './card.module.css';
import { useDispatch } from 'react-redux';
import { getDetail } from '../../redux/action';

const Card = ({ id, name, background_image, genres }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getDetail(id));
  };
  return (
    <div className={style.container} key={id}>
      <Link
        to={`/videogames/${id}`}
        onClick={handleClick}
        className={style.link}
      >
        <img
          src={background_image}
          alt='imagen card'
          className={style.imagenCard}
        />
        <div className={style.descript}>
          <h2 className={style.name}>{name}</h2>
          <div className={style.genres}>
            <span>Genero: </span>{' '}
            {Array.isArray(genres) && genres.map((genre) => genre.name).join(', ')}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
