import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
    //console.log(reviews)
    if (!reviews){
      return null;
    }
  return (
    <div className='row row-cols-3 mt-5 mb-3'>
      {
        reviews.map(review => {
          return (
            <div key={review.id} className="card text-white bg-primary mb-3" style={{"maxWidth":"18rem","marginRight":"50px"}}>
              <div className="card-header d-flex justify-content-between">
                  <span>{review.name}</span>
                  <span><StarRating rating={review.rating}/></span>
              </div>
              <div className="card-body">
                  <p className="card-text">{review.review}</p>
              </div>
            </div>
          )
        })
      }
    </div>
    )
}

export default Reviews
