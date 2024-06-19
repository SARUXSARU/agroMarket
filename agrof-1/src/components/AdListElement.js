import React, { useState } from 'react'

import wheat from './icons/wheat.png'
import heart from './icons/heart.png'
import heartRed from './icons/heartRed.png'
import { useLocation } from 'react-router-dom'
import AddAd from './AddAdForm'
import EditAdForm from './EditAdForm'



export default function AdListElement({title,price,adLocation,image,category,selectedMenuItem}) {
    const [isLiked, setIsLiked] = useState(false);
    const [isEditAdFormOpen, setIsEditAdFormOpen] = useState(false);

    const handleEditAdButtonClick = (e) =>{
        e.preventDefault();
        setIsEditAdFormOpen(true);
    }

    const handleEditAdFormClose = () =>{
        setIsEditAdFormOpen(false);
    }

    const handleLikeClick = (e) => {
        e.preventDefault();
        setIsLiked(!isLiked);
    };

    const location=useLocation();

    const renderEditAdButton = () => {
        if (location.pathname === '/userPage'){
            if (selectedMenuItem === 'userAds') {
            return(
                <button className='editAdButton' onClick={handleEditAdButtonClick}>Edytuj</button>               
            )}
        }else
            return null;
    }

    console.log(image);

    const shortTittle=title.length > 11 ? title.slice(0,11) + '..' : title;

    return (
        <div className='ad'>
            <a href='/adPage' className='ad-click'>
                <div className='ad-div-img'>
                    <img className='ad-img' alt="marchew" src={require("./../components/icons/" + image)}></img>
                </div>
                <div className='ad-div-details'>
                    <div className='ad-div-header'>
                        <text className='ad-tittle'>{shortTittle}</text>
                        
                            <button className='like-button' onClick={handleLikeClick}>
                            <img src={isLiked ? heartRed : heart} alt='Like' style={{ width: '20px', height: '20px' }} />  
                        </button>
                        {renderEditAdButton()}
                        
                    </div>
                    <text className='ad-price'>{price}</text>
                    <text className='ad-location'>{adLocation}</text>
                </div>

            </a>
                    {isEditAdFormOpen&& (
                        <div className='modal-background'>
                            <EditAdForm closeModal={handleEditAdFormClose}></EditAdForm>
                        </div>
                    )}


        </div>


    );
}
