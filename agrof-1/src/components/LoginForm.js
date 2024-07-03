import React, { useContext, useState } from 'react'
import closeIcon from './icons/closeIcon.png'
import eyeIcon from './icons/eye.png'
import axios from '../services/api.js';
import { useUser } from '../contexts/UserContext.js';


export default function LoginForm({ closeModal, handleLogin, openRegister }) {

    const { setUser } = useUser();

    function showPassword() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleLoginClick = () => {
        handleLogin();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {

            const email = form.email.value;
            const authCode = form.password.value;

            try {
                const response = await axios.post('/user/login',
                    {
                        email, authCode
                    });
                if (response.status === 200) {
                    //setUser(response.data.userDTO);
                    //console.log(response.data.userDTO);

                    //console.log("ID: "+response.data._id);
                    
                    setUser(response.data._id);
                    localStorage.setItem('user',JSON.stringify(response.data._id));
                    console.log(localStorage.getItem('user'))
                    
                    handleLoginClick();
                    alert("Zalogowano pomyślnie");
                } else {
                    console.log("response: " + response.status)
                    alert("Błędny email lub hasło");
                }
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Błędy email lub hasło");
            }
        }
    };

    return (
        <form className='editUserBackground' id="login-form" onSubmit={handleSubmit}>
            <div className='editUserContainer'>
                <button onClick={() =>
                    closeModal(false)}
                    className='closeButton'
                >
                    <img className='closeIcon' src={closeIcon} alt='closeIcon'></img>
                </button>
                <h1>Logowanie</h1>
                <ul className='listEdit'>
                    <small className='smallText'>Email</small>
                    <input type='email' className='loginRegisterInputField' placeholder='email' id="emial" name="email" required></input>
                    <div className="passwordInputContainer">
                        <small className='smallText'>Hasło</small>
                        <input type='password' className='loginRegisterInputField' placeholder='hasło' id="password" name="authCode" required></input>
                        <span className='eyeButton' onMouseDown={showPassword} onMouseUp={showPassword}><img className='eyeButton' src={eyeIcon} alt="eyeIcon"></img></span>
                    </div>
                    <div className='loginRegisterButtonContainer'>
                        <input type='submit' className='loginRegisterButton' value={"Zaloguj się"} ></input>
                        <span className='loginOrRegisterText'>nie masz konta?</span>
                        <button type="button" className='loginRegisterButton' onClick={openRegister}>Zarejestruj się</button>
                    </div>
                </ul>
            </div>
        </form>
    )
}
