import React, { useState, useEffect } from 'react'
import AdListElement from './AdListElement'
import { useLocation } from 'react-router-dom';
import { Ad } from '../classes/Ad';
import axiosInstance from '../services/api';

export default function AdList({ selectedMenuItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let itemsPerPage = 8;
  const location = useLocation();
  const categoryFilter = location.state?.category;


  if (location.pathname === '/userPage') {
    itemsPerPage = 6;
  } else if (location.pathname === '/searchResults') {
    itemsPerPage = 12;
  }



  // const items = [<AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>];
  let [ads, setAds] = useState([

  ]);

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }

    const fetchData = async () => {


      try {
        const response = await axiosInstance.get(`/ad/`);

        if (response.status === 200) {
          const updatedAds = [...ads];
          const existingAdIds = new Set(updatedAds.map(ad => ad.id));
          if (location.pathname === '/userPage') {
            if(updatedAds.length===0)
            response.data.adsList.forEach(element => {
              if (JSON.parse(localStorage.getItem('user_id')) === element.user_id) {
                updatedAds.push(new Ad(element.title, element.price, element.title, element.image, element.category))
              }
            });
          } else {
            console.log("all ogloszenia")
            //console.log(updatedAds);
            if(updatedAds.length===0)
            response.data.adsList.forEach(element => {
              updatedAds.push(new Ad(element.title, element.price, element.title, element.image, element.category));
            });
          }
          setAds(updatedAds);
        }
      } catch (error) {
        console.log("fetch ads to list error: " + error);
      }
    }
    fetchData();
  }, [location]);





  const filteredAds = categoryFilter
    ? ads.filter(ad => ad.category === categoryFilter)
    : ads;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAds.slice(startIndex, endIndex);


  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(ads.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (location.pathname === '/') {
    return (
      <ul className="four-per-row-list">
        {currentItems.map((ad, index) => (
          <li key={index} className="list-item">
            <AdListElement title={ad.title}
              price={ad.price}
              adLocation={ad.adLocation}
              image={ad.image}
              category={ad.category}
              selectedMenuItem={selectedMenuItem}
            />
            {console.log("Tytuł: " + ad.title)}
          </li>
        ))}
      </ul>
    );
  }

  const getPageItemClass = (pageNumber) => {
    return pageNumber === currentPage ? 'paginationPageButtonActive' : 'paginationPageButton';
  };

  return (
    <div>
      <ul className="four-per-row-list">
        {currentItems.map((ad, index) => (
          <li key={index} className="list-item">
            <AdListElement
              title={ad.title}
              price={ad.price}
              adLocation={ad.adLocation}
              image={ad.image}
              selectedMenuItem={selectedMenuItem} />
          </li>
        ))}
      </ul>
      <div className='paginationContainer'>
        <button className='paginationNePrButton' onClick={prevPage}>❰</button>

        {Array.from({ length: Math.ceil(ads.length / itemsPerPage) }, (_, index) => (
          <button className={getPageItemClass(index + 1)} key={index} onClick={() => goToPage(index + 1)} >{index + 1}</button>
        ))}
        <button className='paginationNePrButton' onClick={nextPage}>❱</button>
      </div>
    </div>
  )
}
