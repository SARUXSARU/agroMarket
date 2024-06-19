import React, { useState, useEffect } from 'react'
import AdListElement from './AdListElement'
import { useLocation } from 'react-router-dom';
import { Ad } from '../classes/Ad';

export default function AdList({selectedMenuItem}) {
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

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location]);

  const ads = [
    new Ad('Marchew', 18+" zł", 'Łódź', 'Marchew.webp',2),
    new Ad('Jabłko koksa', 45+" zł", 'Warszawa', 'jabłko.jpg',1),
    new Ad('Ziemniaki', 12+" zł", 'Toruń', 'ziemniak.jpg',2),
    new Ad('Miód gryczany', 55+" zł", 'Częstochowa', 'miod_gryka.jpg',4),
    new Ad('Truskawki', 10+" zł", 'Poznań', 'truskawki.jpg',1),
    new Ad('Buraki', 15+" zł", 'Łódź', 'buraki.jpg',2),
    new Ad('Maliny 500g', 18+" zł", 'Łódź', 'maliny.jpg',1),
    new Ad('Pszenica', 65+" zł", 'Białystok', 'pszenica.webp',5),
    new Ad('Owies', 95+" zł", 'Lublin', 'owies.jpg',5),
    new Ad('Czereśnie', 15+" zł", 'Szczecin', 'czeresnie.jpg',1),
    new Ad('Żyto', 70+" zł", 'Tomaszów Mazowiecki', 'żyto.jpg',5),
    new Ad('Kukurydza', 75+" zł", 'Łódź', 'kukurydza.jpg',5),
    new Ad('Miód mniszkowy', 38+" zł", 'Warszawa', 'miod_mniszek.jpg',4),
    new Ad('Owies', 85+" zł", 'Warszawa', 'owies.jpg',5),
    new Ad('Miód spadziowy', 45+" zł", 'Wrocław', 'miod_spadz.jpg',4),
    new Ad('Maślaki', 55+" zł", 'Tuszyn', 'maslak.jpg',3),
    new Ad('Pieczarki', 12+" zł", 'Gdańsk', 'pieczarka.jpg',3),
    new Ad('Kurki', 29+" zł", 'Rzgów', 'kurki.jpg',3),
];

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
                            selectedMenuItem={selectedMenuItem}/>
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
