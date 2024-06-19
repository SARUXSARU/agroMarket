import React, { useEffect, useState } from 'react'
import logo from './icons/logo.png'
import fruit from './icons/apple.png'
import vegetable from './icons/carrot.png'
import honey from './icons/honey.png'
import wheat from './icons/wheat.png'
import mushroom from './icons/mushroom.png'
import { Link, useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useNavigate } from 'react-router-dom'



export default function Navbar() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/searchResults', { state: { category } });
  };

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus==='true');
  })

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    setIsLoginFormOpen(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    setIsLoginFormOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    window.location.href='/';
    alert("Wylogowano pomyślnie");
  };


  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const handleIconClick = () => {
    setIsLoginFormOpen(true);
    setIsRegisterFormOpen(false);
  }


const closeModal = () => {
  setIsLoginFormOpen(false);
  setIsRegisterFormOpen(false);
};

function renderUserIcon(){
  if (isLoggedIn == true && location.pathname==='/userPage')
    return (
      <div className='logoutUserContainer'>
        <a href='/userPage' className='profil-icon' ></a>
        <button className='logoutButton' onClick={handleLogout}>Wyloguj się</button>
      </div>
    )
  else if (isLoggedIn == true)
    return (
      <div className='logoutUserContainer'>
        <a href='/userPage' className='profil-icon' ></a>
      </div>
    )
  else{
    return(
      <div>
      <a className='profil-icon' onClick={handleIconClick}></a>
      {isLoginFormOpen && ( 
        <div className='modal-background'> 
         <LoginForm  closeModal={closeModal} handleLogin={handleLogin} openRegister={handleRegisterClick}/>
        </div> 
        )}
        {isRegisterFormOpen && (
            <div className='modal-background'>
              <RegisterForm closeModal={closeModal} openLogin={handleIconClick} handleRegister={handleRegister} />
            </div>
          )}
        </div>
    )
  }


}



const renderSearchBar = () => {
  if (location.pathname === '/userPage') {
    return null;
  }else
    return (
      <form className='navbar-form'>
        <input type='text' className='navbar-search-bar' placeholder="wyszukaj produkt..."></input>
        <Link to="/searchResults" style={{ textDecoration: 'none' }}>
          <button className='navbar-search-button' >Szukaj</button>
        </Link>
      </form>
    )
}

const renderCategories = () => {
  if (location.pathname === '/')
    return (
      <div className='navbar-categories'>
        <a href='/searchResults' >
          <div className='navbar-category'>
            <button className='navbar-fruit-button'  >
              <img className='fruit-category-icon' src={fruit} alt='fruit' />
            </button>
            <text className='navbar-category-text'>
              Owoce
            </text>
          </div>
        </a>
        <a href='/searchResults' >
          <div className='navbar-category' onClick={() => handleCategoryClick(2)}>
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={vegetable} alt='vegetable' />
            </button>
            <text className='navbar-category-text'>
              Warzywa
            </text>
          </div>
        </a>
        <a href='/searchResults' >
          <div className='navbar-category' >
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={mushroom} alt='mushroom' />
            </button>
            <text className='navbar-category-text'>
              Grzyby
            </text>
          </div>
        </a>
        <a href='/searchResults' >
          <div className='navbar-category' >
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={honey} alt='honey' />
            </button>
            <text className='navbar-category-text'>
              Miody
            </text>
          </div>
        </a>
        <a href='/searchResults' >
          <div className='navbar-category' >
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={wheat} alt='wheat' />
            </button>
            <text className='navbar-category-text'>
              Zboża
            </text>
          </div>
        </a>
      </div>
    )
  else
    return null;
}

const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

const handleRegisterClick = () => {
  setIsRegisterFormOpen(true);
  setIsLoginFormOpen(false);
};



return (
  <div className='navbar'>

    <a href='/' className="navbar-logo">
      <img href='/' src={logo} className='navbar-logo' alt="logo" />
    </a>

    {renderSearchBar()}

    
    {renderUserIcon()}
      
    



    {renderCategories()}




  </div>
)
}
