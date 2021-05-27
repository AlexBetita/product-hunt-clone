import { useSelector } from 'react-redux';

import Products from '../Products'

import './Home.css';

const Home = () => {

  const products = useSelector((state)=>{
    return state.products.list.map((productId) => state.products[productId])
  })

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
