import React, { useRef, useEffect } from 'react'
import Logo from '../tmovie.png';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {

    const headerRef = useRef(null);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);


    return (
        <>
            <div ref={headerRef} className='header'>
                <div className='header_wrap container'>
                    <div className="logo">
                        <img alt='' src={Logo}></img>
                        <Link className='hover:text-green-500' to="/">mPlay</Link>
                    </div>
                    <div className='nav'>
                        <Link to='/' className='item md:text-3xl hover:text-red-600'>Movies</Link>
                        <Link to='/favourites' className='item md:text-3xl hover:text-red-600'>Favourites</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar