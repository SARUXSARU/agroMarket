import React from 'react'
import closeIcon from './icons/closeIcon.png'
import axios from '../services/api';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../services/api';

export default function EditUser({ closeModal, fetchUser }) {

    const [userData, setUserData] = useState(null);
    const id = JSON.parse(localStorage.getItem('user_id'));

    // const deleteUser = async () => {
    //     try {
    //         const response = await axiosInstance.delete(`/user/${id}`);
    //         if (response.status === 200) {
    //             alert("Użytkownik został usunięty");
    //             closeModal(false);
    //             setIsLoggedIn(false);
    //             localStorage.setItem('isLoggedIn', false);
    //             window.location.href = '/';
    //             localStorage.clear();
    // alert("Wylogowano pomyślnie");
    //         } else {
    //             console.log("Status is not 200: " + response.status);
    //         }
    //     } catch (error) {
    //         console.log("Delete user error: " + error);
    //     }
    // }

    useEffect(() => {
        if (id) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`/user/${id}`);
                    if (response.status === 200) {
                        setUserData(response.data.userDTO);
                        
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUserData();
        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;

        if (form.checkValidity()) {
            try {
                console.log("/user/" + id)
                const response = await axios.put(`/user/${id}`, {
                    firstName, lastName, email, phoneNumber
                });
                if (response.status === 200) {
                    closeModal();
                    alert("Dane zostały zaktualizowane");
                    fetchUser();
                } else {
                    alert("Dane nie zostały zaktualizowane!");
                }
            } catch (error) {
                console.log("Smth went wwrong: " + error)
            }
        } else {
        }
    };



    return (



        <form className='editUserBackground' onSubmit={handleSubmit}>
            <div className='editUserContainer'>
                <button onClick={() =>
                    closeModal(false)}
                    className='closeButton'
                >
                    <img className='closeIcon' src={closeIcon} alt='closeIcon'></img>
                </button>
                <h1>Edytuj swoje dane</h1>
                <ul className='listEdit'>
                    <small className='smallText'>Imię</small>
                    <input type='text' name="firstName" className='editType' defaultValue={userData?.firstName} placeholder='Imię' required></input>
                    <small className='smallText'>Nazwisko</small>
                    <input type='text' name="lastName" className='editType' defaultValue={userData?.lastName} placeholder='Nazwisko' required></input>
                    <small className='smallText'>email</small>
                    <input type='email' name="email" className='editType' defaultValue={userData?.email} placeholder='email' required></input>
                    <small className='smallText'>Numer tel. (np. 123-123-123)</small>
                    <input type='tel' name="phoneNumber" className='editType' defaultValue={userData?.phoneNumber} maxLength={11} placeholder='123-123-123' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required></input>
                </ul>
                <div className='editButtons'>
                    <button className='editButton'>Edytuj</button>
                    <button onClick={() =>
                        closeModal(false)}
                        className='discardButton'
                        type="button"
                    >
                        Anuluj
                    </button>
                    {/* <button 
                        className='deleteButton'
                        type="button"
                    >
                        Usuń
                    </button> */}
                    </div>

            </div>

        </form>
    )
}
