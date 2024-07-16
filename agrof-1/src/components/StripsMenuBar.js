import React, { useState } from 'react'
import arrow from './icons/arrow.svg'
import { Link, useNavigate } from 'react-router-dom';

export default function StripsMenuBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        navigate('/searchResults', { state: { category } });
    };

  

    return (
        <div className='strip'>
            <div className="dropdown">
                <button className="dropbtn">Kategorie <img className='arrow' src={arrow} alt='arrow'></img></button>
                <div className="dropdown-content">
                    <Link to="#">Wszystkie</Link>
                    <div className="dropdown-button" onClick={() => handleCategoryClick(1)}>Owoce</div>
                    <div className="dropdown-button" onClick={() => handleCategoryClick(2)}>Warzywa</div>
                    <div className="dropdown-button" onClick={() => handleCategoryClick(3)}>Grzyby</div>
                    <div className="dropdown-button" onClick={() => handleCategoryClick(4)}>Miody</div>
                    <div className="dropdown-button" onClick={() => handleCategoryClick(5)}>Zboża</div>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Sortuj <img className='arrow' src={arrow} alt='arrow'></img></button>
                <div className="dropdown-content">
                    {/* //<Link href="#">Popularność</Link>
                    <Link href="#">Najnowsze</Link>
                    <Link href="#">Najstarsze</Link> */}
                    <div className="dropdown-button" >Cena od najniższej</div>
                    <div className="dropdown-button" >Cena od najwyższej</div>

                </div>
            </div>
        </div>
    )
}
