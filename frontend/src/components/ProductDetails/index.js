import { useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { viewOneProduct } from '../../store/products';

import './ProductDetails.css';

const ProductDetails = () =>{
  const dispatch = useDispatch();

  const {id} = useParams();
  let maker = false;

  useEffect(()=> {
    const viewProduct = async () => {
      await dispatch(viewOneProduct(id))
    }
    viewProduct()

  }, [dispatch, id])


  let product = useSelector((state)=>{
    try{
        if(state.session.products[id].id === state.products.viewedProducts[id].id){
          maker = true
        }
      }
    catch(e) {
      //
    }
      return state.products.viewedProducts[id]
    })

  const user = useSelector((state)=>{
    return state.session.user
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
      <div className='div__product__details__main'>
        <div className='div__product__details__flex'>
          <div className='div__product__details__styles'>
              <div>
                <h1>
                  {product.title}
                </h1>
              </div>

              <div>
                <h3>
                  {product.tagline}
                </h3>
              </div>

              <div className='div__product__details__thumbnail__container'>
                <div className='div__product__details__thumbnail__flex'>
                  <div className='div__product__details__thumbnail__styles'>
                    <img className='div__product__details__thumbnail'
                      src={product.thumbnail}
                      alt='product thumbnail'
                    >
                    </img>
                  </div>
                </div>
              </div>

              <div className='div__product__details__description'>
                {product.description}
              </div>

              <div>
                {/* {product.views} */}
              </div>

              <div>
                <div className='div__product__details__owner__flex'>
                    <div className='div__product__details__profileimage'>

                        {product.User
                          ?
                          <img
                            className='img__product__details__profileimage'
                            src={product.User.profileImage}
                            alt='profile icon'
                          >
                          </img>
                          :
                          <img
                            className='img__product__details__profileimage'
                            src={user.profileImage}
                            alt='profile icon'
                          >
                          </img>
                        }
                      <div>
                      {product.User ? product.User.fullName : user.fullName}
                      {product.User
                        ?
                          <div className='div__product__details__username'>
                            @{product.User.username}
                          </div>
                        :
                          <div className='div__product__details__username'>
                            @{user.username}
                          </div>
                      }
                      </div>
                  </div>
                </div>
              </div>

              {
                maker
                  &&
                <NavLink to={`/product/${product.id}/edit`}>
                  <button>
                    Edit
                  </button>
                </NavLink>
              }
            </div>
         </div>
      </div>
      <div>
        <div className='div__product__details__comments__flex'>
          <div className='div__discussion__text'> DISCUSSION </div>
          <div className='div__product__details__comments__styles'>

            {product.Comments
                      ?
                      <ul>
                          COMMENTS
                        {
                          Object.keys(product.Comments).map((key)=>{
                            return (
                              <li key={key}>
                                  <h4>
                                    {product.Comments[key].comment}
                                  </h4>
                                <div>
                                  {`Commented by: `}
                                  <img
                                      className='img__product__details__profileimage'
                                      src={product.Comments[key].User.profileImage}
                                      alt='profile icon'
                                    >
                                </img>
                                  @{product.Comments[key].User.username}
                                </div>
                              </li>
                              )
                          })
                        }
                      </ul>
                  :
                  <ul>
                      COMMENTS
                  </ul>
              }
            </div>
          </div>
      </div>
    </>
  )
};

export default ProductDetails;
