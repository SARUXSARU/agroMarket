import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import SearchResults from './pages/SearchResults';
import AdPage from './pages/AdPage';
import { UserProvider } from './contexts/UserContext.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: '/userPage',
    element: <UserPage />
  },
  {
    path: '/searchResults',
    element: <SearchResults />
  },
  {
    path: 'adPage',
    element: <AdPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} >
      
        
      
    </RouterProvider>
    </UserProvider>
  </React.StrictMode>



);

reportWebVitals();
