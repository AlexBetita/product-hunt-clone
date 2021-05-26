import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import './Products.css';

const Products = ({id}) => {

  const dispatch = useDispatch();
  const products = useSelector((state)=>{
    return state.products.list
  })


  return (
    <div className='div__product'>
      <div className='div__product__thumbnail'>
        <img className='img__product__thumbnail' src={products[id].thumbnail}></img>
      </div>
      <div className='div__styles__content'>
        <div className='div__product__content'>
          <a className='a__product__title'>
            {products[id].title}
          </a>
          <a className='a__product__description'>
            {products[id].description}
          </a>
        </div>

        <div className='div__product__content__meta'>
            <div className='div__comments'>
              <img className='img__comment__icon'
                src='https://image.freepik.com/free-vector/comment-icon_9385-2.jpg'>
              </img>
              <a className='a__product__comments'>
                {Object.keys(products[id].Comments).length}
              </a>
            </div>
            <span className='span__product__availability'>
              Free
            </span>
            <span className='span__product__tags'>
            </span>
        </div>
      </div>

      <div className='div__product__vote'>
        <button className='button__product__vote'>
          <img className='img__upvote__icon'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQljNtHHEqdLaanBiQXQlzS1kP6gzKqACEouw&usqp=CAU'>
          </img>
          <span className='span__product__upvotes'>
            {products[id].upvotes}
          </span>

        </button>
      </div>
    </div>
  );
}

export default Products;
