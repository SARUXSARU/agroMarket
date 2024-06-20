import React from 'react'
import { useLocation } from 'react-router-dom'

export default function PageInfoBar() {
  const location= useLocation();
  let text='';

  switch(location.pathname){
    case '/':
      text='Ostatnio Dodane';
      break;
    case '/userPage':
      text='Twoje konto';
      break;
    case '/searchResults':
      text='Wyniki Wyszukiwania';
      break;
    case '/adPage':
      text='';
      break;
    default:
      text='Nie wiem gdzie jesteśmy' ;
  }
  return (
    <div>
        <span className='page-info-text'>{text}</span>
    </div>
  )
}
