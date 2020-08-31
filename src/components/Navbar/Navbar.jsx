import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'

function Navbar() {

return(
    <nav className="Navigation">
        <ul>
            <Link className="link" to="/forside">FORSIDE</Link>
            <span>|</span>
            <Link className="link" to="/om">OM RØRDAL RUN</Link>
            <span>|</span>
            <Link className="link" to="/distancer">DISTANCER</Link>
            <span>|</span>
            <Link className="link" to="/tilmelding">TILMELDING</Link>
            <span>|</span>
            <Link className="link" to="/login">LOGIN</Link>
        </ul>
    </nav>
)

}

export default Navbar