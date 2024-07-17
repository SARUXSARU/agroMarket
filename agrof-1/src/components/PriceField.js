import React, { useEffect } from 'react';
import { useState } from 'react';
import heart from './icons/heart.png';
import heartRed from './icons/heartRed.png';
import { useUser } from '../contexts/UserContext';
import axiosInstance from '../services/api';

export default function PriceField({ _id }) {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState();
    const [firstLastName, setFirstLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [homeAdress, setHomeAdress] = useState(''); //todo!!!!!!


    useEffect(() => {
        const fetchAdData = async () => {
            try {

                if (localStorage.getItem('user_id')) {

                    try {
                        const response = await axiosInstance.get(`/user/${JSON.parse(localStorage.getItem('user_id'))}`)
                        if (response.status === 200) {
                            if (response.data.userDTO.favourite.includes(_id)) {
                                setIsLiked(true);
                            }
                        }
                    } catch (error) {
                        console.log("can't get user to check is liked: " + error)
                    }
                }

                const response = await axiosInstance.get(`/ad/${_id}`)
                if (response.status === 200) {
                    try {
                        const adOwnerResponse = await axiosInstance.get(`/user/${response.data.adDTO.user_id}`);
                        if (adOwnerResponse.status === 200) {
                            setTitle(response.data.adDTO.title);
                            setPrice(response.data.adDTO.price);
                            setFirstLastName(adOwnerResponse.data.userDTO.firstName + " " + adOwnerResponse.data.userDTO.lastName);
                            setPhone(adOwnerResponse.data.userDTO.phoneNumber);
                        } else {
                            console.log("can't get adOwner");
                        }
                    } catch (error) {
                        console.log("fetch adOwner error: " + error);
                    }
                } else {
                    console.log("can't get this ad ...")
                }
            } catch (error) {
                console.log("fetch price ad data: " + error);
            }
        }
        fetchAdData();

    }, []);

    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(false);

    function setUpIsLiked() {
        if (localStorage.getItem('user_id')) {
            try {
                const response = axiosInstance.get(`/user/${JSON.parse(localStorage.getItem('user_id'))}`)
                if (response.status === 200) {
                    console.log(response.data.userDTO.favourite)
                }
            } catch (error) {
                console.log("can't get user to check is liked: " + error)
            }
        }
    }




    const handleLikeClick = async (e) => {
        e.preventDefault();
        const favourite = [_id];
        if (localStorage.getItem('user_id')) {
            try {
                const response = await axiosInstance.put(`/user/${JSON.parse(localStorage.getItem('user_id'))}`, { favourite })
                if (response.status === 200) {
                    console.log("poszlo");
                    setIsLiked(!isLiked);
                }
            } catch (error) {
                console.log("can't get fav of this user: " + error)
            }
        } else {
            alert("Aby polubić ogłoszenie musisz się zalogować")
        }

    };

    const maskData = (data) => {
        if (!localStorage.getItem('user_id')) {
            if (!data) return "";
            return data.charAt(0) + "*".repeat(data.length - 1);
        } else {
            return data;
        }

    };

    //const isUserLoggedIn = localStorage.getItem('user');

    //const fullName = JSON.parse(localStorage.getItem('user')) ? firstLastName : maskData("Marek") + " " + maskData("Kowalski");
    //const phoneNumber = isUserLoggedIn ? "123 123 132" : maskData("123 123 123");
    //const address = isUserLoggedIn ? "Łódź, ul.Śląska 138" : "Łódź, ul." + maskData("Śląska 138");

    return (
        <div className="price-container">

            <div className="price-tytul">
                {title}
                <button className='like-button-price' onClick={handleLikeClick}>
                    <img src={isLiked ? heartRed : heart} alt='Like' style={{ width: '30px', height: '30px' }} />
                </button>
            </div>
            <div className="price-cena"> {price} zł </div>
            <div className='price-user-imie'>{maskData(firstLastName)}</div>
            <div className='price-user-tel'>tel. {maskData(phone)}</div>
            {/* <div className='price-user-address'>{address}</div> */}
        </div>
    );
}
