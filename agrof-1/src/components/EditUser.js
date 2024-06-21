import React from 'react'
import closeIcon from './icons/closeIcon.png'
import { useUser } from '../contexts/UserContext';
import axios from '../services/api';

export default function EditUser({ closeModal }) {

    const {setUser} = useUser();


    const handleSubmit = async (event) => {
        console.log(useUser.firstName)
        event.preventDefault();
        const form = event.target;
        const name=form.name.value;
        const authCode=setUser.authCode;
        const firstName=form.firstName.value;
        const lastName=form.lastName.value;
        const email=form.email.lastName;
        const phoneNumber=form.phoneNumber.phoneNumber;


//////// wrong cos we need to give id to get person or we have
        //or we have to change find by on backend (may be find by email
        //cos we have unique email for each user)
        
        if (form.checkValidity()) {
            try{
                const response = await axios.post('/user/email',{
                    name, authCode, firstName, lastName, email, phoneNumber
                });
                if(response.status===200){
                    closeModal()
                    
                    alert("Dane zostały zaktualizowane");
                   
                }else{
                    alert("Dane nie zostały zaktualizowane!");
                }
            }catch( error){
                console.log("first name: "+useUser.firstName);
                console.log("Smth went wwrong: "+error)
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
                    <input type='text' id="name" className='editType' defaultValue={useUser.firstName} placeholder='Imię' required></input>
                    <small className='smallText'>Nazwisko</small>
                    <input type='text' id="surname" className='editType' defaultValue={useUser.lastName} placeholder='Nazwisko' required></input>
                    <small className='smallText'>email</small>
                    <input type='email' id="email" className='editType' defaultValue="email@gmail.com" placeholder='email' required></input>
                    <small className='smallText'>Numer tel. (np. 123-123-123)</small>
                    <input type='tel' id="tel" className='editType' defaultValue="123-456-789" maxLength={11} placeholder='123-123-123' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required></input>
                </ul>
                <div className='editButtons'>
                    <button className='editButton'>Edytuj</button>
                    <button onClick={() =>
                        closeModal(false)}
                        className='discardButton'
                    >
                        Anuluj
                    </button></div>

            </div>

        </form>
    )
}
