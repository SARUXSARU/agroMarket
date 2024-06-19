import React from 'react'
import Navbar from '../components/Navbar'
import './AdPage.css';
import AdComponent from '../components/ImgSlider';
import marchew1 from '../components/icons/Marchew.webp'
import marchew2 from '../components/icons/marchew2.webp'
import marchew3 from '../components/icons/marchew3.webp'
import ziemniak from '../components/icons/ziemniak.jpg'
import jabłko from '../components/icons/jabłko.jpg'
import PageInfoBar from '../components/PageInfoBar';
import DescriptionField from '../components/DescriptionField';
import PriceField from '../components/PriceField';

const slides = [
  { url: marchew1},
  { url: marchew2},
  {url: marchew3}
];

const containerStyles = {
  width: "500px",
  height: "280px",
};


export default function AdPage() {
  document.title="Tytuł";
  return (
    
    <div className='AdPage'>
      <Navbar></Navbar>
      <PageInfoBar></PageInfoBar>
      <div className='img-price'>
        <AdComponent slides={slides}></AdComponent>
        <PriceField></PriceField>
      </div>
      <div className='description-map'>
        <DescriptionField></DescriptionField>
      </div>
      
      
    </div>
  )
}
