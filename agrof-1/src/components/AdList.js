import React, { useState, useEffect } from 'react'
import AdListElement from './AdListElement'
import { useLocation } from 'react-router-dom';
import { Ad } from '../classes/Ad';
import axiosInstance from '../services/api';


export default function AdList({ selectedMenuItem }) {
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



  // const items = [<AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>,
  // <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement />, <AdListElement selectedMenuItem={selectedMenuItem}/>, <AdListElement selectedMenuItem={selectedMenuItem}/>];
  

  

    // const fetchData = async () => {
    //   try {
    //     const response = await axiosInstance.get(`/ad/`);

    //     if (response.status === 200) {
    //       const updatedAds = [...ads];
    //      const adsList = response.data.adsList;
    //       const adsIds = response.data.adsIds;
    //       if (location.pathname === '/userPage') {
    //         if (updatedAds.length === 0) {
    //           response.data.adsList.forEach((element, index) => {
    //             if (JSON.parse(localStorage.getItem('user_id')) === element.user_id) {
    //               const _id=adsIds[index];
    //               updatedAds.push(new Ad(_id, element.title, element.price,element.description, element.title, element.image, element.category))
    //             }
    //           });
    //         }
    //       } else {
    //         if (updatedAds.length === 0) {
    //           adsList.forEach((element, index) => {
    //             const _id = adsIds[index];
    //             updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
    //           });
    //         }

    //       }
    //       console.log(updatedAds);
    //       setAds(updatedAds);
    //     }
    //   } catch (error) {
    //     console.log("fetch ads to list error: " + error);
    //   }
    // }

    // function searchForTitle(param,title){

    //   let findingFor=toString(param).toLowerCase;
    //   let iHave=toString(title).toLowerCase;

    //   if(findingFor.includes(iHave)){
    //     return true;
    //   }else{
    //     false;
    //   }

      

    // }

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/ad/`);
    
        if (response.status === 200) {
          const adsList = response.data.adsList;
          const adsIds = response.data.adsIds;
          let updatedAds = [];
    
          if (location.pathname === '/userPage') {
            adsList.forEach((element, index) => {
              if (JSON.parse(localStorage.getItem('user_id')) === element.user_id) {
                const _id = adsIds[index];
                updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
              }
            });
          } else if(location.pathname.includes('/searchResults')){
           console.log(window.location.search)
           const queryParams=new URLSearchParams(window.location.search);
           const param=queryParams.get('query')
            if(param===''){
              adsList.forEach((element, index) => {
                const _id = adsIds[index];
                updatedAds.push(new Ad(_id, element.title, element.price, element.description, element.title, element.image, element.category));
              });
            }else{
              const normalizeAndSort = (str) => {
                return str.toLowerCase().split(' ').sort().join(' ');
            };
            
            // Funkcja do sprawdzenia, czy wszystkie słowa z param są obecne w title
            const wordsContained = (param, title) => {
                const paramWords = param.toLowerCase().split(' ');
                const titleWords = title.toLowerCase().split(' ');
            
                return paramWords.every(word => titleWords.includes(word));
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
          console.log(updatedAds);
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
            {console.log("przekazane _id:"+ad._id)}
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
