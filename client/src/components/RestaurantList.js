import React, { useContext, useEffect } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import {Link, useNavigate} from 'react-router-dom';
import StarRating from "../components/StarRating";

function RestaurantList() {
  const { restaurants,setRestaurants,ratings,setRatings,averageRating } = useContext(RestaurantsContext);
  let navigate = useNavigate();
  const fetchRestaurants = async() => {
    const response = await RestaurantFinder.get('/');
    setRestaurants(response.data.data);
  }
  useEffect(() => {
    fetchRestaurants();
  },[])
  useEffect(() => {
    const fetchRatings = async() => {
      const response = await RestaurantFinder.get('/reviews');
      setRatings(response.data.data);
      //console.log("This is the response",response.data.data);
    }
    fetchRatings();
  },[])
  const handleDelete = async(e,id) => {
    try{
        e.stopPropagation();
        const response = await RestaurantFinder.delete(`/${id}`);
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    }
    catch(ex){
        console.log(ex)
    }
  }

  const handleUpdate = (e,id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  }

  const navigateToDetail = (id) => {
    navigate(`/restaurants/${id}`)
  }
  return (
    <div className='list-group'>
        <table className='mt-4 table table-hover'>
            <thead >
                <tr className='table-dark'>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    restaurants.map((restaurant) => {
                        return (
        
                                <tr key={restaurant.id} onClick={() => navigateToDetail(restaurant.id)}>
                                  <td >{restaurant.name}</td>
                                  <td>{restaurant.location}</td>
                                  <td>{"$".repeat(restaurant.price_range)}</td>
                                  <td>
                                    <StarRating rating={averageRating(restaurant.id,ratings)}/>
                                  </td>
                                  <td>
                                      <button onClick={(e) => handleUpdate(e,restaurant.id)} className='btn btn-warning'>UPDATE</button>
                                  </td>
                                  <td><button onClick={(e) => handleDelete(e,restaurant.id)} className='btn btn-danger'>DELETE</button></td>
                               </tr>

                        )
                    })
                }
            </tbody>
        </table>
    </div>
    )
}

export default RestaurantList
