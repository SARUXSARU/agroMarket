import React from 'react'
import { useState } from 'react';
import heart from './icons/heart.png'
import heartRed from './icons/heartRed.png'



export default function PriceField() {
    const [isLiked, setIsLiked] = useState(false);
    const handleLikeClick = (e) => {
        e.preventDefault();
        setIsLiked(!isLiked);
    };
    return (
        <div className="price-container">
            <div className="price-tytul">
                Marchew
                <button className='like-button-price' onClick={handleLikeClick}>
                    <img src={isLiked ? heartRed : heart} alt='Like' style={{ width: '30px', height: '30px' }} />
                </button>

            </div>
            <div className="price-cena"> 18 zł </div>
            <div className='price-user-imie'>Marek Kowalski</div>
            <div className='price-user-tel'>tel. 123 123 132</div>
            <div className='price-user-tel'>Łódź, ul.Śląska 138</div>
        </div>
    )
}
