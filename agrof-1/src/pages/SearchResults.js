import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './SearchResults.css';
import PageInfoBar from '../components/PageInfoBar';
import AdList from '../components/AdList';
import StripsMenuBar from '../components/StripsMenuBar';



export default function SearchResults() {
  document.title = "Wyniki wyszukiwania"
  
  const [sortType,setSortType]= useState('new');
  

  return (
    <div className='SearchResults'>
      <Navbar></Navbar>
      <PageInfoBar></PageInfoBar>
      <StripsMenuBar sortType={sortType} setSortType={setSortType}></StripsMenuBar>
      <AdList sortType={sortType}></AdList>
    </div>
  )
}
