// SearchBar.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './search.module.css';
import { searchByName } from '../../redux/action'; // Importa la acción searchByName
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const history = useHistory();
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (name === '' || name.charCodeAt(0) === 32)
      return alert(
        'por favor ingresa un nombre valido para realizar la busqueda. '
      );
    try {
      const result = await dispatch(searchByName(name));

      setName(''); // Limpiar el input después de enviar
      history.push('/home');
      return result;
    } catch (error) {
      alert('Juego no encontrado.');
      console.error('Error searching by name:', error);
    }
  };

  return (
    <div>
      <div className={style.inputContainer}>
        <input
          type='search'
          className={style.inputSearch}
          placeholder='  Search Name'
          onChange={handleChange}
          value={name}
        />
        <button className={style.buttonSearch} onClick={handleSubmit}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
