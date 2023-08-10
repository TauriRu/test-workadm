import React, { useEffect, useRef, useState } from 'react';
import './header.css';
import HeaderLogo from '../../images/logo.svg';
import Search from '../../images/search.svg';
import { Shipment } from '../../App';

interface HeaderProps {
    shipments: Shipment[];
    onShipmentClick: (event: React.MouseEvent<HTMLAnchorElement>, shipmentId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ shipments, onShipmentClick }) => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredShippingNames, setFilteredShippingNames] = useState<string[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (!inputValue) {
            setSearchInput('');
            setFilteredShippingNames([]);
            return;
        }
        setSearchInput(inputValue);

        const filteredNames = shipments
            .map(shipment => shipment.name)
            .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()));

        setFilteredShippingNames(filteredNames);
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setFilteredShippingNames([]); // Close the search results
            }
        };
      
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    
    return (
        <header className='header'>
            <div className="container">
                <div className="row">
                    <div className='col-sm-4'>
                        <img className='headerLogo' src={HeaderLogo} alt="headerLogo" />
                    </div>
                    <div className="col-sm-8" ref={searchContainerRef}>
                        <div className='searchContainer'>
                            <input
                                className='searchInput'
                                type="text"
                                placeholder="Search"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                            <img className='searchIcon' src={Search} alt="search" />
                        </div>
                        <div className='searchResults'>
                            {filteredShippingNames.map(name => (
                                <div key={name} className='searchResultItem'>
                                    <a
                                        href="/"
                                        className='searchResultLink'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            const selectedShipment = shipments.find(shipment => shipment.name === name);
                                            if (selectedShipment) {
                                                onShipmentClick(event, selectedShipment.id);
                                            }
                                        }}
                                    >
                                        {name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="mobile-header">
                <button aria-label="Mobile Menu" className={`hamburger-icon ${mobileMenuOpen ? 'hamburger-open' : ''}`} onClick={toggleMobileMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button> 
                {mobileMenuOpen ? (
                <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <ul>
                        {shipments.map((shipment) => (
                            <li className='shipmentList' key={shipment.id}>
                                <a
                                    href="/"
                                    role="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onShipmentClick(event, shipment.id);
                                    }}
                                >
                                    {shipment.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                ) : ( '' )}
            </div>
        </header>
    );
};

export default Header;
