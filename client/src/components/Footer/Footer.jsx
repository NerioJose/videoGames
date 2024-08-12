import React from 'react';
import style from './footer.module.css';
import logo from '../../media/LogoBlanco.png';
const Footer = () => {
  return (
    <div className={style.containerFoot}>
      <img src={logo} alt='logo' />
      <p> © Derechos reservados por el autor.</p>
    </div>
  );
};

export default Footer;
