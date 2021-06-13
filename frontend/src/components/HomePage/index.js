import { useSelector } from 'react-redux';

import Products from '../Products';

import './Home.css';

const Home = () => {

  const products = useSelector((state)=>{
    return state.products.list.map((productId) => state.products[productId])
  })

  if (!products) {
    return null;
  }

  return (
    <div className='div__home__styles'>
      <div className='div__home__date'>
        Today
      </div>
      {Object.keys(products).map((key) =>{
        return <Products key={key} products = {products[key]}/>
      })}

    </div>
  );
}

export default Home;
