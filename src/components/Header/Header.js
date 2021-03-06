import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import Logout from '../Logout/Logout';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className='header'>
      <ul>
        <li>
          <Link to='/offers'>
            <img alt='logo' src={logo} />
          </Link>
        </li>
        {pathname !== '/offers' && (
          <li>
            <Link to='/offers'>
              <FontAwesomeIcon icon='long-arrow-alt-left' />
              Go back
            </Link>
          </li>
        )}
        <li>
          <Link to='/profile'>
            <FontAwesomeIcon icon='user-circle' />
          </Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </header>
  );
};

export default Header;
