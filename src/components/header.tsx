
import React from 'react';
import HeaderLogo from '../images/logo.svg';

const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <a href='/'>
                    <img src={HeaderLogo} alt="logo" />
                </a>

                <div>
                  <input type="text" placeholder="Search" />
                </div>

            </nav>
        </header>
    );
};

export default Header;