import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './SearchResults.css';
import PageInfoBar from '../components/PageInfoBar';
import AdList from '../components/AdList';
import StripsMenuBar from '../components/StripsMenuBar';



export default function SearchResults() {
  document.title = "Wyniki wyszukiwania"
  
  const [sortType,setSortType]= useState('new');
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  

  return (
    <div className='SearchResults'>
      <Navbar justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn}></Navbar>
      <PageInfoBar></PageInfoBar>
      <StripsMenuBar sortType={sortType} setSortType={setSortType}></StripsMenuBar>
      <AdList sortType={sortType} justLoggedIn={justLoggedIn}></AdList>
    </div>
  )
}
