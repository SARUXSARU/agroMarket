import React from 'react'
import closeIcon from './icons/closeIcon.png'
import axios from '../services/api.js';

export default function RegisterForm({ closeModal, openLogin, handleRegister, fetchAd }) {



    const handleRegisterClick = () => {
        handleRegister();
    };

    // function myFunction() {
    //     var x = document.getElementById("password");
    //     if (x.type === "password") {
    //         x.type = "text";
    //     } else {
    //         x.type = "password";
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const password = form.password.value;
        const passwordRepeat = form.repeatPassword.value;
        const authCode = password;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        const name = form.email.value;

        if (form.checkValidity()) {
            if (ifPasswordAreSame(password, passwordRepeat)) {
                try {
                    const response = await axios.post('/user/',
                        {
                            name, authCode, firstName, lastName, email, phoneNumber
                        }
                    );
                    console.log("response: " + response.data);
                    if (response.status === 200) {
                        try {
                            const getRegisteredResponse = await axios.post('/user/login', { email, authCode });
                            console.log("getregisered data: " + getRegisteredResponse.data);
                            if (getRegisteredResponse.status === 200) {
                                localStorage.setItem('user_id',JSON.stringify(getRegisteredResponse.data._id));
                                fetchAd();
                            }
                        } catch (error) {
                            console.log("nie udało sie zalogowac na konto pomimo rejestracji");
                        }
                        handleRegisterClick();
                        alert("Witaj w AgroMarket.\nZarejestrowano pomyślnie ");
                    } else {
                        console.log("response: " + response.status + " " + response.data)
                        alert("Błąd rejestracji");
                    }
                } catch (error) {
                    console.error("Error register: ", error);
                    alert("Rejestracja nie powiodła się");
                }
            }
        } else {
        }
    };

    function ifPasswordAreSame(password, passwordRepeat) {
        if (password === passwordRepeat) {
            return true;
        } else {
            alert("Hasła nie są takie same");
            return false;
        }
    }

    return (
        <form className='editUserBackground' id="registerForm" onSubmit={handleSubmit}>
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
                    <input type='text' className='loginRegisterInputField' placeholder='Jan' name="firstName" required></input>
                    <small className='smallText'>Nazwisko</small>
                    <input type='text' className='loginRegisterInputField' placeholder='Kowalski' name="lastName" required></input>
                    <small className='smallText'>Numer tel. (np. 123-123-123)</small>
                    <input type='tel' className='loginRegisterInputField' maxLength={11} placeholder='123-123-123' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" name="phoneNumber" required></input>
                    <small className='smallText'>Email</small>
                    <input type='email' className='loginRegisterInputField' placeholder='email@gmail.com' name="email" required></input>
                    <div className="passwordInputContainer">
                        <small className='smallText'>Hasło</small>
                        <input type='password' className='loginRegisterInputField' placeholder='hasło' id="password" name="password" required></input>
                        <small className='smallText'>Powtórz hasło</small>
                        <input type='password' className='loginRegisterInputField' placeholder='powtórz hasło' name="repeatPassword" id="repeatPassword" required></input>
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
