import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from '../services/api.js';

export default function UserData({ handleEditClick }) {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const id = JSON.parse(localStorage.getItem('user_id'));
      console.log("ID: " + id);
      const response = await axios.get(`/user/${id}`);
      if (response.status === 200) {
        setUserData(response.data.userDTO);
        console.log("all is ok");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      console.log("zaciongam");
      fetchUser();
    }
  },[]);

  return (
    <div className='backgroundData'>
      <ul>
        <li name="Imie"><strong>Imię:</strong> {userData?.firstName}</li>
        <li name="Nazwisko"><strong>Nazwisko:</strong> {userData?.lastName}</li>
        <li name="Email"><strong>Email:</strong> {userData?.email}</li>
        <li name="Tel"><strong>Numer telefonu:</strong> {userData?.phoneNumber}</li>
        <button onClick={() => handleEditClick(fetchUser)} className='editButton'>
          Edytuj dane
        </button>
      </ul>
    </div>
  );
}
