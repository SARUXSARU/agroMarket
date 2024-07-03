import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../services/api.js';

export default function PageInfoBar() {
  const location = useLocation();
  let text = '';
  const { user } = useUser();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
      if (user) {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`/user/${user}`);
            if (response.status === 200) {
              setUserData(response.data.userDTO);
              
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
  
        fetchUserData();
      }
    }, [user]);


  const ifLoggedIn = () =>{
    var name="";
    if(!user){
      return name;
    }else if(user){
      return " "+userData.firstName;
    }
  }

  switch (location.pathname) {
    case '/':
      text = 'Ostatnio Dodane';
      break;
    case '/userPage':
      text = 'Witaj' +  "!";
      break;
    case '/searchResults':
      text = 'Wyniki Wyszukiwania';
      break;
    case '/adPage':
      text = '';
      break;
    default:
      text = 'Nie wiem gdzie jesteśmy';
  }
  return (
    <div>
      <span className='page-info-text'>{text}</span>
    </div>
  )
}
