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


export default function Navbar({ justLoggedIn, setJustLoggedIn,fetchAd }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/searchResults', { state: { category } });
  };

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  })

  const handleLogin = async () => {
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
    window.location.href = '/';
    localStorage.clear();
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

  function renderUserIcon() {
    if (isLoggedIn === true && location.pathname === '/userPage')
      return (
        <div className='logoutUserContainer'>

          <Link to='/userPage' className='profil-icon' ></Link>
          <button className='logoutButton' onClick={handleLogout}>Wyloguj się</button>
        </div>
      )
    else if (isLoggedIn === true)
      return (
        <div className='logoutUserContainer'>
          <Link to='/userPage' className='profil-icon' ></Link>
        </div>
      )
    else {
      return (
        <div>
          <Link className='profil-icon' onClick={handleIconClick}></Link>
          {isLoginFormOpen && (
            <div className='modal-background'>
              <LoginForm closeModal={closeModal} handleLogin={handleLogin} openRegister={handleRegisterClick} justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn} fetchAd={fetchAd}/>
            </div>
          )}
          {isRegisterFormOpen && (
            <div className='modal-background'>
              <RegisterForm closeModal={closeModal} openLogin={handleIconClick} handleRegister={handleRegister} justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn} fetchAd={fetchAd}/>
            </div>
          )}
        </div>
      )
    }


  }

  const [search, setSearch] = useState('');
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  }


  const renderSearchBar = () => {
    if (location.pathname === '/userPage') {
      return null;
    } else
      return (
        <form className='navbar-form'>
          <input type='search' name="searchValue" className='navbar-search-bar' onChange={handleInputChange} placeholder="wyszukaj produkt..." defaultValue={new URLSearchParams(window.location.search).get('query')}></input>
          <Link to={`/searchResults?query=${search}`} style={{ textDecoration: 'none' }}>
            <button className='navbar-search-button' >Szukaj</button>
          </Link>
        </form>
      )
  }

  const renderCategories = () => {
    if (location.pathname === '/')
      return (
        <div className='navbar-categories'>
          {/* // <Link to='/searchResults' > */}
          <div className='navbar-category' onClick={() => handleCategoryClick(1)}>
            <button className='navbar-fruit-button'  >
              <img className='fruit-category-icon' src={fruit} alt='fruit' />
            </button>
            <span className='navbar-category-text'>
              Owoce
            </span>
          </div>
          {/* // </Link> */}
          {/* <Link to='/searchResults' > */}
          <div className='navbar-category' onClick={() => handleCategoryClick(2)}>
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={vegetable} alt='vegetable' />
            </button>
            <span className='navbar-category-text'>
              Warzywa
            </span>
          </div>
          {/* </Link>
          <Link to='/searchResults' > */}
          <div className='navbar-category' onClick={() => handleCategoryClick(3)}>
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={mushroom} alt='mushroom' />
            </button>
            <span className='navbar-category-text'>
              Grzyby
            </span>
          </div>
          {/* </Link>
          <Link to='/searchResults' > */}
          <div className='navbar-category' onClick={() => handleCategoryClick(4)}>
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={honey} alt='honey' />
            </button>
            <span className='navbar-category-text'>
              Miody
            </span>
          </div>
          {/* </Link>
          <Link to='/searchResults' > */}
          <div className='navbar-category' onClick={() => handleCategoryClick(5)}>
            <button className='navbar-fruit-button' >
              <img className='fruit-category-icon' src={wheat} alt='wheat' />
            </button>
            <span className='navbar-category-text'>
              Zboża
            </span>
          </div>
          {/* </Link> */}
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
      <Link to='/' className="navbar-logo">
        <img href='/' src={logo} className='navbar-logo' alt="logo" />
      </Link>
      {renderSearchBar()}
      {renderUserIcon()}
      {renderCategories()}
    </div>
  )
}
