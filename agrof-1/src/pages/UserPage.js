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


export default function UserPage() {
  document.title = "Twoje konto";
  const [selectedMenuItem, setSelectedMenuItem] = useState('userData');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fetchUser, setFetchUser] = useState(null);


  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleEditClick = (fetchUserFunction) => {
    setFetchUser(() => fetchUserFunction);
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
          <UserData handleEditClick={handleEditClick} />
        ) : (
          <UserList selectedMenuItem={selectedMenuItem} />
        )}

      </div>
      {isEditModalOpen && (
        <div className='modal-background' >
          <EditUser closeModal={handleEditModalClose} fetchUser={fetchUser} />
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
