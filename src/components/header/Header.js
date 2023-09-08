import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import StockPriceChat from '../../pages/chat/StockPriceChat';

const Header = () => {
    const [activeLink, setActiveLink] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);


    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div>
        <StockPriceChat></StockPriceChat>
        <header className="header">
        {/* <StockPriceChat></StockPriceChat> */}
            <div style={{display:"flex",justifyContent:"space-between",margin:"15px",width:"25%",float:"right"}}>
                <div className={`header__nav-item ${activeLink === 'home' ? 'active' : ''}`}>
                    <Link to="/" onClick={() => handleLinkClick('home')}>Home</Link>
                </div>
                <div className={`header__nav-item ${activeLink === 'about' ? 'active' : ''}`}>
                    <Link to="/about" onClick={() => handleLinkClick('about')}>About</Link>
                </div>
                <div className={`header__nav-item ${activeLink === 'login' ? 'active' : ''}`}>
                    <Link to="/login" onClick={() => handleLinkClick('login')}>Login</Link>
                </div>
                {/* <div className={`header__nav-item ${activeLink === 'login' ? 'active' : ''}`}>
                    <Link to="/camera" onClick={() => handleLinkClick('camera')}>Image</Link>
                </div> */}
                <div className={`header__nav-item ${activeLink === 'register' ? 'active' : ''}`}>
                    <Link to="/register" onClick={() => handleLinkClick('register')}>Register</Link>
                </div>
            </div>
        </header>
        </div>
    );
};

export default Header;
