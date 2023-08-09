
import React from 'react';
import './header.css';
import HeaderLogo from '../../images/logo.svg';
import Search from '../../images/search.svg';

const Header: React.FC = () => {
    return (
        <header className='header'>
            <nav className='navigation'>
                <div className="container">
                    <div className="row">

                        <div className="col-3">
                            <a href='/'>
                                <img src={HeaderLogo} alt="logo" />
                            </a>
                        </div>
                        <div className="col-6">
                            <div className='searchContainer'>
                            <input className='searchInput' type="text" placeholder="Search" />
                                <img className='searchIcon' src={Search} alt="search" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default Header;