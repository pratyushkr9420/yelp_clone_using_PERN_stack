import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import {RestaurantsContext} from '../context/RestaurantsContext';


const AddRestaurant = () => {
  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const[priceRange,setPriceRange] = useState("Price Range")
  const {restaurants,addRestaurant,setRestaurant} =  useContext(RestaurantsContext);
  // Function to add a new restaurant

  const handleSubmtit = async(e) => {
    e.preventDefault();
    try{
      const response = await RestaurantFinder.post('/',{
        name,
        location,
        price_range:priceRange
      })
      addRestaurant(response.data);
      setName('');
      setLocation('');
      setPriceRange("Price Range")
    }
    catch(ex){
      console.log(ex.message)
    }
  }
    return (
      <div className="container mt-5">
      <form className="row g-3">
        <div className="col-md-4">
          <input value={name} type="text" className="form-control" id="input1" placeholder="Name" onChange={(ev) => setName(ev.target.value)}/>
        </div>
        <div className="col-md-4">
          <input value={location} type="text" className="form-control" id="input2" placeholder="Location" onChange={(ev) => setLocation(ev.target.value)}/>
        </div>
        <div className="col-md-2">
          <select className="form-select" id="select1" value={priceRange} onChange={(ev) => setPriceRange(ev.target.value)}>
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="col-md-2">
          <button onClick={ handleSubmtit } type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
    );
  };
  
  export default AddRestaurant;