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

  }, [])


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
        {/* {product.views} */}
      </div>
      <div>
        <div className='div__product__details__profileimage'>

          {product.User
            ?
            <img
              className='img__product__details__profileimage'
              src={product.User.profileImage}
            >
            </img>
            :
            <img
              className='img__product__details__profileimage'
              src={user.profileImage}
            >
            </img>
          }

        </div>

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
      {
        maker
          &&
        <NavLink to={`/product/${product.id}/edit`}>
          <button>
            Edit
          </button>
        </NavLink>
      }
    </>
  )
};

export default ProductDetails;
