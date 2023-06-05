//navigation bar for website
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
    const [fixed, setFixed] = useState(false);
    const [height, setHeight] = useState(false);

    const navbar = useRef();

    useEffect(() => {
        const handleScroll = () => { 
            setFixed(window.scrollY > 500); 
        };
        window.addEventListener('scroll', handleScroll);
        // setHeight(navbar.current.clientHeight);
        return () => window.removeEventListener('scroll', handleScroll);
    });


    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <nav className={'${sticky ? "sticky" : ""}'}>
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
                            <Link to='/Home' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/home.png'} alt = "Home" /> 
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/home.png'} alt = "Home" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Explore' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/explore.png'} alt = "Explore" /> 
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/explore.png'} alt = "Explore" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Search' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/search.png'} alt = "Seach" />
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/search.png'} alt = "Search" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Login' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/login.png'} alt = "Login" />
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/login.png'} alt = "Login" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/ReportUser' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/report.png'} alt = "Report User" />
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/report.png'} alt = "Report User" />}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/User' className='nav-links' onClick={closeMobileMenu}>
                                {click ? <img class='navbar-icons' src={process.env.PUBLIC_URL + './images/myprofile.png'} alt = "My Profile" />
                                : <img class='display-none' src={process.env.PUBLIC_URL + './images/myprofile.png'} alt = "My Profile" />}
                            </Link>
                        </li>
                    </ul>
                </div>
             </nav> 
        </nav>
    );
}

export default Navbar;