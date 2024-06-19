import React from 'react'
import closeIcon from './icons/closeIcon.png'
import eyeIcon from './icons/eye.png'
import Navbar from './Navbar';

export default function LoginForm({ closeModal, handleLogin, openRegister}) {


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

      const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
            handleLoginClick();
            alert("Zalogowano pomyślnie");
        } else {
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
                    <input type='email' className='loginRegisterInputField' placeholder='email' id="emial" required></input>
                    <div className="passwordInputContainer">
                    <small className='smallText'>Hasło</small>
                        <input type='password' className='loginRegisterInputField' placeholder='hasło' id="password" required></input>
                        <span className='eyeButton' onMouseDown={showPassword} onMouseUp={showPassword}><img className='eyeButton' src={eyeIcon} alt="eyeIcon"></img></span>
                    </div>
                    <div className='loginRegisterButtonContainer'>
                        <input type='submit' className='loginRegisterButton' value={"Zaloguj się"} ></input>
                        <text className='loginOrRegisterText'>nie masz konta?</text>
                        <button type="button"className='loginRegisterButton' onClick={openRegister}>Zarejestruj się</button>
                    </div>
                </ul>
            </div>
        </form>
    )
}
