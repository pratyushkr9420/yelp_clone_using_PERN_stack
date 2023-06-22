import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const [name,setName] = useState('');
  const [review,setReview] = useState('');
  const [rating,setRating] = useState(0.0);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleRefresh = () => {
      window.location.reload();
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      //console.log(id,name,review,rating)
      const response = await RestaurantFinder.post( `/${id}/reviews`,{
        id,
        name,
        review,
        rating
      })
      handleRefresh();
      //navigate(`/restaurants/${id}`)
    }
    catch(ex){
      console.log(ex.message);
    }
  }

  return (
    <form className="row gx-3 gy-2 align-items-center mt-4">
      <div className="col-sm-4">
        <label className="visually-hidden" htmlFor="specificSizeInputName">Name</label>
        <input value={name} type="text" className="form-control" id="specificSizeInputName" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="col-sm-5">
        <div className="input-group">
          <textarea value={review} id='review' className='form-control' placeholder='Review' onChange={(e) => setReview(e.target.value)}></textarea>
        </div>
      </div>
      <div className="col-sm-3">
        <label className="visually-hidden" htmlFor="specificSizeSelect">Preference</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select" id="specificSizeSelect">
          <option disabled>Rating</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="col-auto">
        <button onClick={(e) => handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
      </div>
</form>
  )
}

export default AddReview