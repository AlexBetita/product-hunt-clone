import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { voteProduct } from '../../store/products';

import './Products.css';

const Products = ({products}) => {

  let user;

  const upvoteElementRef = useRef()
  const triangleRef = useRef()
  const circleRef = useRef()

  const dispatch = useDispatch()

  const [getUpvotes, setUpvotes] = useState(products.upvotes ? products.upvotes : (
              products.Upvotes ? Object.keys(products.Upvotes).length : 0)
              )
  const [disableVote, setDisableVote] = useState(false)

  let upvoted = useSelector((state)=>{
    if(state.session.user){
      user = state.session.user
      for (const [key, value] of Object.entries(state.session.upvotes)){
        if(key){
          if(products.id === value.id){
            return true
          }
        }
      }
    }
  })

  useEffect(() => {
    if(upvoted){
      upvoteElementRef.current.classList.add('voted__true')
    }
  },[user, upvoted])

  const vote = async () =>{
    if(user){
      if (upvoteElementRef.current.classList.contains('voted__true')){

        setDisableVote(true)
        await upvoteElementRef.current.classList.remove('voted__true')
        await dispatch(voteProduct(products.id))
        setUpvotes(getUpvotes - 1)
        setDisableVote(false)
      } else {
        setDisableVote(true)
        await triangleRef.current.classList.add('hidden')

        await circleRef.current.classList.remove('hidden')
        await circleRef.current.classList.add('scale')

        setTimeout(()=>{
          triangleRef.current.classList.remove('hidden')
          circleRef.current.classList.remove('scale')
          circleRef.current.classList.add('hidden')
        }, 200)
        await upvoteElementRef.current.classList.add('voted__true')

        await dispatch(voteProduct(products.id))
        setUpvotes(getUpvotes + 1)
        setDisableVote(false)
      }
    }
  }



  return (

      <div className='div__product'>
          <NavLink
              activeClassName='div__styles__content'
              to={`/posts/${products.id}`}
              >
            <div className='div__product__thumbnail'>
              <img className='img__product__thumbnail' src={products.thumbnail}
                alt='product thumbnail'
              ></img>
            </div>
        </NavLink>

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
                <div className='img__comment__icon'>
                  <i className="fas fa-comment"></i>
                </div>
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
          <button className='button__product__vote' ref={upvoteElementRef}
            disabled={disableVote} onClick={vote}>
            <div className='upvote__circle__progress hidden' ref={circleRef}>

            </div>
            <div className='img__upvote__icon' ref={triangleRef}>
              ▲
            </div>
            <span className='span__product__upvotes'>
                {getUpvotes}
            </span>
          </button>
        </div>
      </div>
  );
}

export default Products;
