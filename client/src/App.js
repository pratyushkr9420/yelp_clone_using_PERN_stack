import React from "react";
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
// Importing Routes

import Home from './routes/Home';
import RestaurantDetailsPage from './routes/RestaurantDetailsPage';
import UpdatePage from './routes/UpdatePage';

// Importing components

import MyComponent from "./components/Header";
import AddRestaurant from "./components/AddRestaurant";
import RestaurantList from "./components/RestaurantList";
import NavBar from "./components/NavBar";
// Importing contexts 

import { RestaurantsContextProvider } from "./context/RestaurantsContext";


function App() {

  return (
    <RestaurantsContextProvider>
      <div className="container App">
        <MyComponent/>
        <NavBar/>
        <AddRestaurant/>
        <Routes>
          <Route path="/restaurants" element={<RestaurantList/>}/>
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage/>}/>
          <Route path="/restaurants/:id/update" element={<UpdatePage/>}/>
        </Routes>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
