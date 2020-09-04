import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'

function Footer() {
    return (
        <footer>
            <div className="FooterGrid">
                <div>
                    <p>INFORMATION:</p>
                <Link className="links" to="/om">OM RØRDAL RUN</Link>
                <Link className="links" to="/distancer">DISTANCER</Link>
                <Link className="links" to="/tilmelding">TILMELDING</Link>
                <Link className="links" to="/deltagerliste">DELTAGERLISTE</Link>
                </div>

                <div>
                <p>KONTAKT OS:</p>
                <p>+45 35 67 90 87</p>
                <p> ROERDALRUN@MAIL.COM</p>
                </div>

                <div>
                    <p>SOCIAL:</p>
                    <AiOutlineInstagram className="icon" style={{ height: '2em', width: '2em' }}/>
                    <FaFacebookF className="icon"/>
                </div>
            </div>
        </footer>
    )
}

export default Footer
