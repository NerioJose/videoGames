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
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          className={style.button}
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
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
