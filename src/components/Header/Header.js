import React from "react";
import Logout from '../../containers/Auth/Logout/Logout';
import "./Header.scss";

const Header = () => {
    return (
        <header className="header">
            <ul>
                <li>LOGO</li>
                <li>USER PANEL</li>
                <li><Logout /></li>
            </ul>
        </header>
    );
};

export default Header;
