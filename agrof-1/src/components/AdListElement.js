import React, { useState } from 'react'
import heart from './icons/heart.png'
import heartRed from './icons/heartRed.png'
import { Link, useLocation } from 'react-router-dom'
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

    

    const shortTittle=title.length > 11 ? title.slice(0,11) + '..' : title;

    return (
        <div className='ad'>
            <Link to='/adPage' className='ad-click'>
                <div className='ad-div-img'>
                    <img className='ad-img' alt="marchew" src={image}></img>
                </div>
                <div className='ad-div-details'>
                    <div className='ad-div-header'>
                        <span className='ad-tittle'>{shortTittle}</span>
                        
                            <button className='like-button' onClick={handleLikeClick}>
                            <img src={isLiked ? heartRed : heart} alt='Like' style={{ width: '20px', height: '20px' }} />  
                        </button>
                        {renderEditAdButton()}
                    </div>
                    <span className='ad-price'>{price}</span>
                    <span className='ad-location'>{adLocation}</span>
                </div>

            </Link>
                    {isEditAdFormOpen&& (
                        <div className='modal-background'>
                            <EditAdForm closeModal={handleEditAdFormClose}></EditAdForm>
                        </div>
                    )}
        </div>


    );
}
