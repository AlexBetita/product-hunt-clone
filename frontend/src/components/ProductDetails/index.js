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
        {
          Object.keys(product.Comments).map((key)=>{
            return (
              <li>
                  {product.Comments[key].comment}
                <div>
                  {`Commented by: ${product.Comments[key].User.username}`}
                </div>
              </li>
              )
          })
        }
      </ul>
      {
        maker
          &&
        <NavLink to={`/product/${product.id}/edit`}>Edit</NavLink>
      }
    </>
  )
};

export default ProductDetails;
