import { NavLink } from 'react-router-dom';

import './Products.css';

const Products = ({products}) => {

  return (

      <div className='div__product'>
        <div className='div__product__thumbnail'>
          <img className='img__product__thumbnail' src={products.thumbnail}></img>
        </div>

        <NavLink
              className='div__styles__content'
              activeClassName='div__styles__content'
              to={`/posts/${products.id}`}
              >
        <div className=''>
          <div className='div__product__content'>

            <div
              className='a__product__title'
              >
                {products.title}
            </div>

            <div
              className='a__product__description'
              >
                {products.tagline}
            </div>
          </div>

          <div className='div__product__content__meta'>
              <div className='div__comments'>
                <img className='img__comment__icon'
                  src='https://image.freepik.com/free-vector/comment-icon_9385-2.jpg'>
                </img>

                {products.Comments
                  ?
                    <div
                    className='a__product__comments'
                    >
                      {Object.keys(products.Comments).length}

                  </div>
                  :
                  <div
                    className='a__product__comments'
                  >
                      0
                  </div>
                }

              </div>
              <span className='span__product__availability'>
                Free
              </span>
              <span className='span__product__tags'>
              </span>
          </div>
        </div>

        </NavLink>

        <div className='div__product__vote'>
          <button className='button__product__vote'>
            <img className='img__upvote__icon'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQljNtHHEqdLaanBiQXQlzS1kP6gzKqACEouw&usqp=CAU'>
            </img>
            <span className='span__product__upvotes'>
              {products.upvotes ? products.upvotes : 0}
            </span>
          </button>
        </div>
      </div>
  );
}

export default Products;
