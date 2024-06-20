import React, { useState } from 'react'
import closeIcon from './icons/closeIcon.png'
import eyeIcon from './icons/eye.png'

export default function RegisterForm({ closeModal, openLogin, handleRegister }) {

    const handleRegisterClick = () => {
        // Logika logowania...
        handleRegister();
    };

    function myFunction() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
            handleRegisterClick();
            alert("Witaj w AgroMarket.\nZarejestrowano pomyślnie ");
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
                <h1>Rejestracja</h1>
                <ul className='listEdit'>
                    <small className='smallText'>Imię</small>
                    <input type='text' className='loginRegisterInputField' placeholder='Jan' required></input>
                    <small className='smallText'>Nazwisko</small>
                    <input type='text' className='loginRegisterInputField' placeholder='Kowalski' required></input>
                    <small className='smallText'>Numer tel. (np. 123-123-123)</small>
                    <input type='tel' className='loginRegisterInputField' maxLength={11} placeholder='123-123-123' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required></input>
                    <small className='smallText'>Email</small>
                    <input type='email' className='loginRegisterInputField' placeholder='email@gmail.com' required></input>
                    <div className="passwordInputContainer">
                        <small className='smallText'>Hasło</small>
                        <input type='password' className='loginRegisterInputField' placeholder='hasło' id="password" required></input>
                        <small className='smallText'>Powtórz hasło</small>
                        <input type='password' className='loginRegisterInputField' placeholder='powtórz hasło' id="password" required></input>
                    </div>
                    <div className='loginRegisterButtonContainer'>
                        <input type="submit" className='loginRegisterButton' value={"Zarejestruj sie"} id="register"></input>
                        <span className='loginOrRegisterText'>masz już konto?</span>
                        <button type="button" className='loginRegisterButton' onClick={openLogin}>Zaloguj się</button>


                    </div>
                </ul>
            </div>
        </form>
    )
}
