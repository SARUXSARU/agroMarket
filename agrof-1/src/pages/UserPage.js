import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar'
import './UserPage.css'
import PageInfoBar from '../components/PageInfoBar';
import UserMenu from '../components/UserMenu';
import UserList from '../components/UserList';
import UserData from '../components/UserData';
import EditUser from '../components/EditUser';
import AddAdForm from '../components/AddAdForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


export default function UserPage() {
  document.title = "Twoje konto";
  const [selectedMenuItem, setSelectedMenuItem] = useState('userData'); // Początkowo wybieramy menu z ogłoszeniami
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className='UserPage'>
      <Navbar ></Navbar>
      <div className='field'></div>
      <PageInfoBar></PageInfoBar>
      <div className='userInfo'>
        <UserMenu handleMenuClick={handleMenuClick} handleAddButtonClick={handleAddButtonClick}></UserMenu>
        {selectedMenuItem === 'userData' ? (
          <UserData handleEditClick={handleEditClick} /> // Wyświetlamy dane użytkownika
        ) : (
          <UserList selectedMenuItem={selectedMenuItem}/>
        )}

      </div>
      {isEditModalOpen && (
        <div className='modal-background' >
          <EditUser closeModal={handleEditModalClose}/>
        </div>
      )}

      {showForm && (
        <div className='modal-background'>
          <AddAdForm closeModal={closeForm} />
        </div>
      )}
    </div>
  )
}
