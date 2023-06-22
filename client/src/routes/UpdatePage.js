import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdatePage = () => {
  const { id }= useParams();
  const navigate = useNavigate();
  const [restaurant,setRestaurant] = useState({});
  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const [priceRange,setPriceRange] = useState(0);
  const findRestaurant = async() => {
    const response = await RestaurantFinder.get(`/${id}`);
    setRestaurant(response.data.data)
    setName(response.data.data.name);
    setLocation(response.data.data.location);
    setPriceRange(response.data.data.price_range);
  }
  useEffect(() => {
    findRestaurant();
  },[]);

  const handleEdit = async(e) => {
    e.preventDefault();
    try{
      const body = {name,
        location,
        "price_range":priceRange
      }
      const response = await RestaurantFinder.put(`/${id}`,body);
      navigate('/restaurants');
    }
    catch(ex){
      console.log(ex.message);
    }

  }

  return (
    <div>
      <form className='mt-5' onSubmit={ handleEdit }>
        <div className='form-group'>
          <label>Name</label>
          <input value={name} type='text' className='form-control' onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='form-group mt-3'>
          <label>Location</label>
          <input value={location} type='text' className='form-control' onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <div className='form-group mt-3'>
          <label>Price Range</label>
          <input value={priceRange} type='number' className='form-control' onChange={(e) => setPriceRange(e.target.value)}/>
        </div>
        <button className='mt-4 btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default UpdatePage