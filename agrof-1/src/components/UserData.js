import React from 'react'

export default function UserData({ handleEditClick }) {
  return (
    <div className='backgroundData'>
        <ul>
            <li><strong>Imię:</strong> Marek</li>
            <li><strong>Nazwisko:</strong> Kowalski</li>
            <li><strong>Email:</strong> email@gmail.com</li>
            <li><strong>Numer telefonu:</strong> 123-456-789</li>
            <button onClick={handleEditClick} className='editButton'
            >
            Edytuj dane</button>
        </ul>
        
    </div>
  )
}
