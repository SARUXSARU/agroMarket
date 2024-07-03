// import React from 'react'
// import { useUser } from '../contexts/UserContext'
// import axios from 'axios';

// export default function UserData({ handleEditClick }) {
//   const {user} = useUser();

//   React.useEffect(() => {
//     console.log('User context in UserPage:', user);
// }, [user]);

// const getUserData = async (event) => {
//   event.preventDefault();
//   const userData=null;
//   try{
//     const response = await axios.get('/user/${user}');
//     if(response.status===200){
//       userData=response.userDTO;
//       console.log("maj user data: "+userData);
//     }
//   }catch (error){
//     console.log(error);
//   }
// }

//   return (
//     <div className='backgroundData'>
//         <ul>
          
//             <li name="Imie"><strong>Imię:</strong> {user?.firstName} </li>
//             <li name="Nazwisko"><strong>Nazwisko:</strong> {user?.lastName}</li>
//             <li name="Email"><strong>Email:</strong> {user?.email}</li>
//             <li name="Tel"><strong>Numer telefonu:</strong> 123-456-789</li>
//             <button onClick={handleEditClick} className='editButton'
//             >
//             Edytuj dane</button>
//         </ul>
        
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from '../services/api.js';

export default function UserData({ handleEditClick }) {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const id=JSON.parse(localStorage.getItem('user'))
          console.log("ID: "+id)
          const response = await axios.get(`/user/${id}`);
          if (response.status === 200) {
            setUserData(response.data.userDTO);
            console.log("all is ok")
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  // const fetchUserData = async () => {
  //   try {
  //     const id = JSON.parse(localStorage.getItem('user'));
  //     console.log("ID: " + id);
  //     const response = await axios.get(`/user/${id}`);
  //     if (response.status === 200) {
  //       setUserData(response.data.userDTO);
  //       console.log("all is ok");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     fetchUserData();
  //   }
  // }, [user]);

  return (
    <div className='backgroundData'>
      <ul>
        <li name="Imie"><strong>Imię:</strong> {userData?.firstName}</li>
        <li name="Nazwisko"><strong>Nazwisko:</strong> {userData?.lastName}</li>
        <li name="Email"><strong>Email:</strong> {userData?.email}</li>
        <li name="Tel"><strong>Numer telefonu:</strong> {userData?.phoneNumber}</li>
        <button onClick={handleEditClick} className='editButton'>
          Edytuj dane
        </button>
      </ul>
    </div>
  );
}
