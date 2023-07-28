import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = () => {
    return (
        <nav className='nav__container'>
            <Link className='link__home' to='/'>Home</Link>
            <Link className='link__create-recipe' to='/create_recipe'>Create a Recipe</Link>

        </nav>
    )
}

export default Nav