import React from 'react'
import { useUser } from '../contexts/UserContext'

export default function UserData({ handleEditClick }) {
  const {user} = useUser();

  React.useEffect(() => {
    console.log('User context in UserPage:', user);
}, [user]);

  return (
    <div className='backgroundData'>
        <ul>
            <li><strong>Imię:</strong> {user?.firstName} </li>
            <li><strong>Nazwisko:</strong> {user?.lastName}</li>
            <li><strong>Email:</strong> {user?.email}</li>
            <li><strong>Numer telefonu:</strong> 123-456-789</li>
            <button onClick={handleEditClick} className='editButton'
            >
            Edytuj dane</button>
        </ul>
        
    </div>
  )
}
