//navigation bar for website
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img class='navbar-pic' src={process.env.PUBLIC_URL + './images/logo.png'} alt = "Logo" />
                    </Link>

                    <div className='menu-icon' onClick={handleClick}>
                        <img style={{width:30, height: 30}} src={process.env.PUBLIC_URL + './images/menubar2.png'} alt = "MenuBar" />
                    </div> 
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/home.png'} alt = "Home" /> 
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/home.png'} alt = "Home" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Browse' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/browse.png'} alt = "Browse" /> 
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/browse.png'} alt = "Browse" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Profile' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/profile.png'} alt = "Profile" />
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/process.png'} alt = "Process" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Login' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/login.png'} alt = "Login" />
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/login.png'} alt = "Login" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Login' className='nav-links-login' onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
             </nav> 
        </>
    );
}

export default Navbar;