import React from 'react'
import Header1 from '../images/run1.jpg'
import './Header.scss'

function Header() {
    return (
        <div className="Header">
            <h1>Rørdal Run 2020</h1>
            <img src={Header1} alt="header"/>
        </div>
    )
}

export default Header
