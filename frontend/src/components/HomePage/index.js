import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import {Products} from '../Products/'

import './Home.css';

const Home = () => {

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])


  return (
    <div>

    </div>
  );
}

export default Home;
