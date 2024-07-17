import React, { useEffect, useState } from 'react'
import heart from './icons/heart.png'
import heartRed from './icons/heartRed.png'
import { Link, useLocation } from 'react-router-dom'
import EditAdForm from './EditAdForm'
import axiosInstance from '../services/api'



export default function AdListElement({ _id, title, price, description, adLocation, image, category, selectedMenuItem, fetchData }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isEditAdFormOpen, setIsEditAdFormOpen] = useState(false);
    const [adData, setAdData] = useState(null);

    useEffect(() => {
        const checkIfLiked = async () => {
            if (localStorage.getItem('user_id')) {
                try {
                    const response = await axiosInstance.get(`/user/${JSON.parse(localStorage.getItem('user_id'))}`);
                    if (response.status === 200) {
                        if (response.data.userDTO.favourite.includes(_id)) {
                            setIsLiked(true);
                        }
                    }
                } catch (error) {
                    console.log("Error checking if ad is liked: " + error);
                }
            }
        };

        checkIfLiked();
    }, [_id]);


    const handleEditAdButtonClick = async (e) => {
        e.preventDefault();
        try {
            const adDetails = {
                _id,
                title,
                price,
                description,
                adLocation,
                image,
                category
            };
            setAdData(adDetails)
            setIsEditAdFormOpen(true);

        } catch (error) {
            console.log("fetch add data to edit error: " + error);
        }

    }

    const handleEditAdFormClose = () => {
        setIsEditAdFormOpen(false);
    }

    const handleLikeClick = async (e) => {
        e.preventDefault();
        const favourite=[_id];
        if(localStorage.getItem('user_id')){
        try{
            const response= await axiosInstance.put(`/user/${JSON.parse(localStorage.getItem('user_id'))}`,{ favourite })
                if(response.status===200){
                    console.log("dodane suczko do ulubionych");
                    setIsLiked(!isLiked);
                    fetchData();
                }
        }catch(error){
            console.log("like error: "+error);
        }
    }else{
        alert("Aby polubić ogłoszenie musisz się zalogować");
    }
       // setIsLiked(!isLiked);
    };

    const location = useLocation();

    const renderEditAdButton = () => {
        if (location.pathname === '/userPage') {
            if (selectedMenuItem === 'userAds') {
                return (
                    <button className='editAdButton' onClick={handleEditAdButtonClick}>Edytuj</button>
                )
            }
        } else
            return null;
    }



    const shortTittle = title.length > 11 ? title.slice(0, 11) + '..' : title;

    return (
        <div className='ad'>

            <Link to={`/adPage/${_id}`} className='ad-click' >
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
                    <span className='ad-price'>{price}zł</span>
                    {/* <span className='ad-location'>{adLocation}</span> */}
                </div>
            </Link>
            {isEditAdFormOpen && (
                <div className='modal-background'>
                    <EditAdForm adData={adData} closeModal={handleEditAdFormClose} fetchData={fetchData}></EditAdForm>
                </div>
            )}
        </div>


    );
}
