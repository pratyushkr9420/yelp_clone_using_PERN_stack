import React, { createContext,useEffect,useState } from 'react'

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
    const [restaurants,setRestaurants] = useState([]);
    const [selectedRestaurant,setselectedRestaurant] = useState({});
    const [ratings,setRatings] = useState([]);
    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants,restaurant]);
    }

    const averageRating = (id,ratings) => {
        let filteredRatings = ratings.filter(rating => rating.restaurant_id === id);
        let sumofRating = 0;
        for(let i = 0; i < filteredRatings.length; i++){
          sumofRating += filteredRatings[i].rating;
        }
        return (sumofRating/filteredRatings.length);
    }
    
    return(
        <RestaurantsContext.Provider value={{restaurants,addRestaurant,setRestaurants,selectedRestaurant,setselectedRestaurant,ratings,setRatings,averageRating}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}