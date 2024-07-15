import React, { useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import './AdPage.css';
import ImgSlider from '../components/ImgSlider';
import marchew1 from '../components/icons/Marchew.webp'
import marchew2 from '../components/icons/marchew2.webp'
import marchew3 from '../components/icons/marchew3.webp'
import ziemniak from '../components/icons/ziemniak.jpg'
import jabłko from '../components/icons/jabłko.jpg'
import PageInfoBar from '../components/PageInfoBar';
import DescriptionField from '../components/DescriptionField';
import PriceField from '../components/PriceField';
import axios from '../services/api.js';
import { useLocation, useParams } from 'react-router-dom';



let initSlides = [
  { url: ""},
  { url: marchew2},
  {url: marchew3}
];

const containerStyles = {
  width: "500px",
  height: "280px",
};


export default function AdPage() {

   const [slides, setSlides] = useState(initSlides);
   const { _id } = useParams();

   console.log(_id);


  useEffect(() => {
    const fetchAd = async () => {
      try {
        
        const response = await axios.get(`/ad/${_id}`);
        if (response.status === 200) {
          const updatedSlides = [...initSlides]; // Copy the initial slides
          updatedSlides[0].url=response.data.adDTO.image;
          setSlides(updatedSlides);
        }
      } catch (error) {
        console.log("fetchAd error: " + error);
      }
    };
    fetchAd();
  }, []);

  document.title="Tytuł";
  return (
    
    <div className='AdPage'>
      <Navbar></Navbar>
      <PageInfoBar></PageInfoBar>
      <div className='img-price'>
        <ImgSlider slides={slides}></ImgSlider>
        <PriceField _id={_id}></PriceField>
      </div>
      <div className='description-map'>
        <DescriptionField _id={_id}></DescriptionField>
      </div>
    </div>
  )
}
