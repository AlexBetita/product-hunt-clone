import { useSelector, useDispatch } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import _ from 'lodash'

// import Products from '../Products';
import ProductDate from '../ProductDate';
import { getProducts } from '../../store/products';

import './Home.css';

const Home = () => {
  const buttonScrollToTop = useRef();
  const dispatch = useDispatch();

  const products = useSelector((state)=>{
    return state.products.list.map((productId) => state.products[productId])
  })

  let pageCounter = 1
  const throttler = _.throttle(scroll, 500)

  let sortedProducts = {}
  
  Object.keys(products).map((key) =>{
    let str = products[key].createdAt
    str = str.substring(0, str.length - 4);
    if(!sortedProducts[str]){
      sortedProducts[str] = []
      return sortedProducts[str].push(products[key])
    } else {
      return sortedProducts[str].push(products[key])
    }
  })

  useEffect(()=>{
    if(window.addEventListener){
      window.addEventListener('scroll', throttler, true);
      window.addEventListener('scroll', scrollToTopChecker);
    }
    return function cleanup(){
      window.removeEventListener('scroll', throttler, true);
      window.removeEventListener('scroll', scrollToTopChecker);
    }

  }, [throttler])

  const setNextPage = async () => {
    await dispatch(getProducts(pageCounter + 1))
    pageCounter += 1
  }

  function scroll(){
    const pixelFromTopToBottom = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    if((pixelFromTopToBottom+document.documentElement.clientHeight) >= document.documentElement.scrollHeight ){
      setNextPage()
    }
  }

  function scrollToTopChecker(){
    const pixelFromTopToBottom = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    try{
      if(!pixelFromTopToBottom){
        buttonScrollToTop.current.classList.add('hidden')
      } else {
        buttonScrollToTop.current.classList.remove('hidden')
      }
    } catch {
      //
    }
  }


  function scrollToTop(){
    window.scrollTo(0, 0);
  }

  if (!products) {
    return null;
  }

  return (
    <>

    <div className='div__home__styles'>

      {/* {Object.keys(products).map((key) =>{
        return <Products key={key} products = {products[key]}/>
      })} */}

      {Object.keys(sortedProducts).map((key)=>{
        return <ProductDate key={key} date={key} products={sortedProducts[key]}/>
      })}


    </div>

      <button className='button__to__top hidden'
      ref={buttonScrollToTop}
      onClick={scrollToTop}
      >
        <div className='angle__up'>
          ⌃︁
        </div>
    </button>
  </>
  );
}

export default Home;
