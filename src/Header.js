import React from 'react';
import SearchIcon from '@material-ui/icons/Search'; // Correct import
import './Header.css';
import Logo from './robinhood.svg';

function Header() {
  return (
    <div className='header__wrapper'>
      {/* logo */}
      <div className='header__logo'>
        <img src={Logo} width={25} alt="Robinhood Logo" />
      </div>
      {/* search */}
      <div className='header__search'>
        <div className='header__searchContainer'>
          <SearchIcon /> {/* Correct usage */}
          <input placeholder='Search' type='text' />
        </div>
      </div>
      {/* menu items */}
      <div className='header__menuItems'>
        <a href='/'>Free Stocks</a>
        <a href='/'>PortFolio</a>
        <a href='/'>Cash</a>
        <a href='/'>Messages</a>
        <a href='/'>Account</a>
      </div>
    </div>
  );
}

export default Header;
