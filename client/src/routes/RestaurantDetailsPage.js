import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant,setselectedRestaurant,ratings,averageRating} = useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        //console.log(response.data.reviews);
        setselectedRestaurant(response.data);

      }
      catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{textAlign:"center","marginTop":"40px"}}>
        <StarRating rating={ratings ? averageRating(id,ratings):0}/>
      </div>
      {selectedRestaurant && (
        <div className='mt-3'>
          <Reviews reviews = {selectedRestaurant.reviews}/>
        </div>  
      )}
      <AddReview/>
    </div>
  )
}

export default RestaurantDetailsPage
