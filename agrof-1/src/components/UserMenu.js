import React from 'react'


export default function UserMenu({ handleMenuClick, handleAddButtonClick }) {
  return (
    <div className='background'>
      <div className='userMenu'>
        <text className='menuTittle'>Informacje o profilu</text>
        <a className='menuItems' onClick={() => handleMenuClick('userData')}>Dane użytkownika</a>
        <a className='menuItems' onClick={() => handleMenuClick('userAds')}>Ogłoszenia użytkownika</a>
        <a className='menuItemsBottom' onClick={() => handleMenuClick('userFavourites')}>Ulubione ogłoszenia</a>
        <button className='addAdButton' onClick={handleAddButtonClick}>Dodaj ogłoszenie</button>
      </div>
    </div>
  )
}
