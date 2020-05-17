import React from "react";
import Logout from '../../containers/Auth/Logout/Logout';
import "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../../assets/logo.jpeg';

const Header = () => {
    return (
        <header className="header">
            <ul>
                <li>
                    <Link to="/offers">
                        <img alt="logo" src={logo} />
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <FontAwesomeIcon icon="user-circle" />
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
