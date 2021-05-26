import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import {getProducts, resetState} from '../../store/products';

import Products from '../Products'

import './Home.css';

const Home = () => {

  const dispatch = useDispatch();

  const products = useSelector((state)=>{
    return state.products.list.map((productId) => state.products[productId])
  })

  useEffect(()=>{
    dispatch(getProducts())
    return () => {
      dispatch(resetState())
    }
  }, [dispatch])


  if (!products) {
    return null;
  }

  return (
    <div>
      <div className='div__home__date'>
        Today
      </div>
      {Object.keys(products).map((key) =>{
        return <Products key={key} id={key} products = {products}/>
      })}

    </div>
  );
}

export default Home;
