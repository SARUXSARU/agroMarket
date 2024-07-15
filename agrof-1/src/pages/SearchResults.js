import React from 'react'
import Navbar from '../components/Navbar'
import './SearchResults.css';
import PageInfoBar from '../components/PageInfoBar';
import AdList from '../components/AdList';
import StripsMenuBar from '../components/StripsMenuBar';



export default function SearchResults() {
    document.title="Wyniki wyszukiwania"
    const queryParams=new URLSearchParams(window.location.search);
    const param=queryParams.get('query');
    console.log("MY pram: " + param)
  return (
    
    <div className='SearchResults'>
        <Navbar></Navbar>
        <PageInfoBar></PageInfoBar>
        <StripsMenuBar></StripsMenuBar>
        <AdList></AdList> 

    </div>
  )
}
