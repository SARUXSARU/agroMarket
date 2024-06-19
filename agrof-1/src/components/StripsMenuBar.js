import React, { useState } from 'react'
import arrow from './icons/arrow.svg'

export default function StripsMenuBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className='strip'>
            <div className="dropdown">
                <button className="dropbtn">Kategorie <img className='arrow' src={arrow} alt='arrow'></img></button>
                <div className="dropdown-content">
                    <a href="#">Owoce</a>
                    <a href="#">Warzywa</a>
                    <a href="#">Grzyby</a>
                    <a href="#">Miody</a>
                    <a href="#">Zboża</a>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Sortuj <img className='arrow' src={arrow} alt='arrow'></img></button>
                <div className="dropdown-content">
                    <a href="#">Popularność</a>
                    <a href="#">Najnowsze</a>
                    <a href="#">Najstarsze</a>
                    <a href="#">Cena od najniższej</a>
                    <a href="#">Cena od najwyższej</a>

                </div>
            </div>
        </div>
    )
}
