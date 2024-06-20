import React, { useState } from 'react'
import arrow from './icons/arrow.svg'
import { Link } from 'react-router-dom';

export default function StripsMenuBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className='strip'>
            <div className="dropdown">
                <button className="dropbtn">Kategorie <img className='arrow' src={arrow} alt='arrow'></img></button>
                <div className="dropdown-content">
                    <Link to="#">Owoce</Link>
                    <Link href="#">Warzywa</Link>
                    <Link href="#">Grzyby</Link>
                    <Link href="#">Miody</Link>
                    <Link href="#">Zboża</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Sortuj <img className='arrow' src={arrow} alt='arrow'></img></button>
                <div className="dropdown-content">
                    <Link href="#">Popularność</Link>
                    <Link href="#">Najnowsze</Link>
                    <Link href="#">Najstarsze</Link>
                    <Link href="#">Cena od najniższej</Link>
                    <Link href="#">Cena od najwyższej</Link>

                </div>
            </div>
        </div>
    )
}
