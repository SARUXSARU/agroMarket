import React, { useState, useEffect } from 'react'
import AdListElement from './AdListElement'
import { useLocation } from 'react-router-dom';
import { Ad } from '../classes/Ad';
import axiosInstance from '../services/api';
import pluralize from 'pluralize';

export default function AdList({ selectedMenuItem, sortType }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let [ads, setAds] = useState([]);
  let itemsPerPage = 8;
  const location = useLocation();
  const categoryFilter = location.state?.category;



  if (location.pathname === '/userPage') {
    itemsPerPage = 6;
  } else if (location.pathname === '/searchResults') {
    itemsPerPage = 12;
  }

  let updatedAds = []; /// tu zmiana przeniosłem z fetch data jakby cos sie wysrało to oddac pod pierwesze if 200

  const fetchData = async () => {
    try {

      
    const response = await axiosInstance.get(`/ad/`);

      if (response.status === 200) {
        const adsList = response.data.adsList;
        const adsIds = response.data.adsIds;

        if (location.pathname === '/userPage') {

          if (selectedMenuItem === 'userAds') {

            adsList.forEach((element, index) => {
              if (JSON.parse(localStorage.getItem('user_id')) === element.user_id) {
                const _id = adsIds[index];
                updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
              }
            });

          } else if (selectedMenuItem === 'userFavourites') {

            let favArr = [];
            try {
              const favResponse = await axiosInstance.get(`/user/${JSON.parse(localStorage.getItem('user_id'))}`)
              if (favResponse.status === 200) {
                favResponse.data.userDTO.favourite.forEach(fav => favArr.push(fav));
              }

            } catch (error) {
              console.log("fetch user fav error: " + error)
            }
            adsList.forEach((element, index) => {
              if (favArr.includes(adsIds[index])) {

                const _id = adsIds[index];
                updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
              }
            });
          }

        } else if (location.pathname.includes('/searchResults')) {
          const queryParams = new URLSearchParams(window.location.search);
          const param = queryParams.get('query')
          const category = location.state?.category;
          if (param === '' || param === null) { //todo null gdy wybieramy kategorie to trzeba ogarnąć
            adsList.forEach((element, index) => {
              const _id = adsIds[index];
              updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
            });
          } else if (param != '') {
            const normalizeAndSort = (str) => {
              return str.toLowerCase().split(' ').sort().join(' ');
            };

            // Funkcja do sprawdzenia, czy wszystkie słowa z param są obecne w title
            const wordsContained = (param, title) => {
              const paramWords = param.toLowerCase().split(' ');
              const titleWords = title.toLowerCase().split(' ');

              return paramWords.every(word => titleWords.includes(word) || titleWords.includes(pluralize.singular(word)) || titleWords.includes(pluralize.plural(word)));
            };

            adsList.forEach((element, index) => {
              const normalizedParam = param.toLowerCase();
              const normalizedTitle = element.title.toLowerCase();

              // Sprawdzenie, czy param zawiera się w tytule lub tytuł zawiera się w param
              const containsCheck = normalizedParam.includes(normalizedTitle) || normalizedTitle.includes(normalizedParam);

              // Sprawdzenie, czy tytuły zawierają te same słowa, niezależnie od kolejności
              const wordsMatchCheck = normalizeAndSort(param) === normalizeAndSort(element.title);

              // Sprawdzenie, czy wszystkie słowa z param są obecne w tytule
              const wordsContainedCheck = wordsContained(param, element.title);

              if (containsCheck || wordsMatchCheck || wordsContainedCheck) {
                const _id = adsIds[index];
                updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
              }
            });
          }

        }
        else {
          adsList.forEach((element, index) => {
            const _id = adsIds[index];
            updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
          });
        }

        setAds(updatedAds);

      }

      if (sortType === "asc") {
        updatedAds.sort((a, b) => a.price - b.price);
        setAds(updatedAds)
      } else if (sortType === "desc") {
        updatedAds.sort((a, b) => b.price - a.price);
        setAds(updatedAds);
      } else {
        updatedAds.reverse();
        setAds(updatedAds);
      }
    } catch (error) {
      console.log("fetch ads to list error: " + error);
    }
  };


  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }

    fetchData();
  }, [location, selectedMenuItem, sortType]);



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

            <AdListElement
              _id={ad._id}
              title={ad.title}
              price={ad.price}
              description={ad.description}
              adLocation={ad.adLocation}
              image={ad.image}
              category={ad.category}
              selectedMenuItem={selectedMenuItem}
              fetchData={fetchData}
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
              _id={ad._id}
              title={ad.title}
              price={ad.price}
              description={ad.description}
              adLocation={ad.adLocation}
              image={ad.image}
              selectedMenuItem={selectedMenuItem}
              fetchData={fetchData}
            />
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
