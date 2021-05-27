import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import './ProductDetails.css';

const ProductDetails = () =>{
  const {id} = useParams();

  const product = useSelector((state)=>{
    return state.products[id]
  })

  if(!product){
    return (
      <>
        Product does not exists
      </>
    )
  }

  return (
    <>
      <div>
        {product.title}
      </div>
      <div>
        <img
          src={product.thumbnail}
        >
        </img>
      </div>
      <div>
        {product.description}
      </div>
      <div>
        {product.views}
      </div>
      <div>
        {product.User.fullName}
        {product.User.username}
      </div>
      <ul>
        COMMENTS
      </ul>
    </>
  )
};

export default ProductDetails;
