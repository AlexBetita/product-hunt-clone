import { useSelector} from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import './ProductDetails.css';

const ProductDetails = () =>{
  const {id} = useParams();
  let maker = false;

  const product = useSelector((state)=>{
    try{
      if(state.products[id].id === state.session.products[id].id){
        maker = true
      }
    } catch(e) {
      //
    }
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
        <h1>
          {product.title}
        </h1>
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
          <img
              className='img__product__details__profileimage'
              src={product.User.profileImage}
              >
          </img>
        </div>
        {product.User.fullName}
        <div className='div__product__details__username'>
          @{product.User.username}
        </div>
      </div>
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
