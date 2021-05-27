import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import Products from '../Products'

import './Profile.css'

const Profile = () => {
  const { username } = useParams();
  let user;
  let productsMade = {}
  let productsUpvoted = {}

  const [made, setMade] = useState(false);

  user = useSelector((state)=> {
    if(state.session.user){
      return state.session.user.username === username  ? state.session.user : false
    } else return false
  })

  useSelector((state)=>{
    Object.keys(state.session.products).map((key)=>{
      productsMade[key] = state.products[key]
    })

    Object.keys(state.session.upvotes).map((key)=>{
      if(state.session.upvotes[key].upvoteableType === 'product'){
        productsUpvoted[state.session.upvotes[key].upvoteableId] = state.products[state.session.upvotes[key].upvoteableId]
      }
    })
  })

  useEffect(()=>{
    if(Object.keys(productsMade).length !== 0){
      setMade(true)
    }
  }, [])

  if (!user){
    return (
      <div>
        User does not exists
      </div>
    )
  }

  return (
    <>
      <div className='div__profile__container'>
        <div className='div__profile__styles'>

          <div className='div__profile__image'>
            <div className='div__profile__image__styles'>
              <img className ='image__profile__image'
              src={`${user.profileImage}`}>
              </img>
            </div>
          </div>

          <div className='div__profile__details'>
            <div className='div__profile__fullname'>
                {user.fullName}
                <div className='div__profile__fullname__icon'>
                  🎈
                </div>
            </div>

            <div className='div__profile__headline'>
                {user.headline}
            </div>
            <div className='div__profile__id__username'>
              <span className='span__profile__id'>
                #{user.id}
              </span>
              <span className='span__profile__username'>
                @{user.username}
              </span>
            </div>

            <div className='div__profile__edit__profile__button__styles'>
              <NavLink className='navlink__edit__profile__button'
                  to='/my/settings/edit'
                >
                  EDIT MY PROFILE
                </NavLink>
            </div>
          </div>

        </div>

        <div className='div__profile__nav__container'>
          <div className='div__profile__nav__styles'>
            <div className='div__profile__nav__container__flex'>

              <NavLink className='navlink__profile__nav__username'
                       activeClassName="navlink__profile__nav__username active"
                       exact={true}
                       to={{pathname: `/@${user.username}`}}
              >
                ACTIVITY
              </NavLink>

              {
              made &&
              <NavLink className='navlink__profile__nav__made'
                       activeClassName="navlink__profile__nav__made active"
                       exact={true}
                       to= {`/@${user.username}/made`}
              >
                {Object.keys(productsMade).length} MADE
              </NavLink>
              }
              <NavLink className='navlink__profile__nav__following'
                       activeClassName = 'navlink__profile__nav__following active'
                       exact={true}
                to= {`/@${user.username}/following`}>
                FOLLOWING
              </NavLink>

              <NavLink className='navlink__profile__nav__followers'
                       exact={true}
                       to= {`/@${user.username}/followers`}
              >
                FOLLOWERS
              </NavLink>

            </div>
          </div>
        </div>
      </div>

      <Route exact path={`/@${user.username}`}>
        <div>
            {Object.keys(productsUpvoted).map((key)=>{
              return <Products key={key} products = {productsUpvoted[key]}/>
            })}
          </div>
      </Route>

      <Route path={`/@${user.username}/made`}>
        <div>
            {Object.keys(productsMade).map((key)=>{
              return <Products key={key} products = {productsMade[key]}/>
            })}
          </div>
      </Route>
    </>
  )
};

export default Profile;
