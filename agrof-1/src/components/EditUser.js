import React from 'react'
import closeIcon from './icons/closeIcon.png'

export default function EditUser({ closeModal }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
            closeModal()
            alert("Dane zostały zaktualizowane");
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
                    <input type='text' id="name" className='editType' defaultValue="Marek" placeholder='Imię' required></input>
                    <small className='smallText'>Nazwisko</small>
                    <input type='text' id="surname" className='editType' defaultValue="Kowalski" placeholder='Nazwisko' required></input>
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
