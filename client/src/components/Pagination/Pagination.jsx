import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/action';
import style from './pagination.module.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className={style.container}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={style.prev}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => {
          // Mostrar primera, última, actual y vecinas
          return page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;
        })
        .map((page, index, array) => (
          <React.Fragment key={page}>
            {index > 0 && page - array[index - 1] > 1 && <span className={style.dots}>...</span>}
            <button
              className={`${style.button} ${page === currentPage ? style.active : ''}`}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          </React.Fragment>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={style.next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
