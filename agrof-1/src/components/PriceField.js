import React from 'react';
import { useState } from 'react';
import heart from './icons/heart.png';
import heartRed from './icons/heartRed.png';
import { useUser } from '../contexts/UserContext';

export default function PriceField() {
    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = (e) => {
        e.preventDefault();
        setIsLiked(!isLiked);
    };

    const maskData = (data) => {
        if (!data) return "";
        return data.charAt(0) + "*".repeat(data.length - 1);
    };

    const isUserLoggedIn = user && Object.keys(user).length !== 0;

    const fullName = isUserLoggedIn ? "Marek Kowalski" : maskData("Marek") + " " + maskData("Kowalski");
    const phoneNumber = isUserLoggedIn ? "123 123 132" : maskData("123 123 123");
    const address = isUserLoggedIn ? "Łódź, ul.Śląska 138" : "Łódź, ul." + maskData("Śląska 138");

    return (
        <div className="price-container">
            <div className="price-tytul">
                Marchew
                <button className='like-button-price' onClick={handleLikeClick}>
                    <img src={isLiked ? heartRed : heart} alt='Like' style={{ width: '30px', height: '30px' }} />
                </button>
            </div>
            <div className="price-cena"> 18 zł </div>
            <div className='price-user-imie'>{fullName}</div>
            <div className='price-user-tel'>tel. {phoneNumber}</div>
            <div className='price-user-address'>{address}</div>
        </div>
    );
}
