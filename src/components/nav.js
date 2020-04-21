import React from 'react';
import Logo from '../assets/aphix.png'

const Nav = () => (
  <div className="nav">
    <img src={Logo} alt="Aphix Software" className="nav__logo" />
    <h3 className="nav__heading">VAT Calulator</h3>
  </div>
);

export default Nav;