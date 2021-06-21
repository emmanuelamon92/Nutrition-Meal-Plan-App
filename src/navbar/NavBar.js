import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <>
            <nav className='navbar'>
                <div className='nav-container'>
                    <Link to='/' className='nav-item'>HOME</Link>
                    <Link to='/myrecipes' className='nav-item'>MY RECIPES</Link>
                    <Link to='/myprofile' className='nav-item'>MY PROFILE</Link>
                </div>
            </nav>
        </>
    )
}