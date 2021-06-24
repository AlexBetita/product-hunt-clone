import { useState } from 'react';
import Products from '../Products';

import './ProductDate.css'

const ProductDate = ({date, products}) => {
    const [showMoreCondition, setShowMoreCondition] = useState(false)

    const showMore = () => {
        setShowMoreCondition(true)
    }

    return (
        <>
        <div>
            <div className='div__home__date'>
                {date}
            </div>
            {!showMoreCondition && products.slice(0, 11).map((prod, key)=>{
                return <Products key={key} products = {prod}/>
            })}
            {showMoreCondition && products.map((prod, key)=>{
                return <Products key={key} products = {prod}/>
            })}
            {products.slice(11, -1).length !== 0 && !showMoreCondition &&
                <span className='span__show__more' onClick={showMore}>
                    {`Show
                        ${products.slice(11, -1).length}
                    More`}
                </span>
            }
        </div>
        </>
    )
}

export default ProductDate;
