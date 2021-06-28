import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import Products from '../Products'
import {getUser} from '../../store/user';

import './Profile.css'

const Profile = () => {

  const dispatch = useDispatch()

  const { username } = useParams();
  let user;
  let newUser;
  let productsMade = {}
  React.memo(()=>{
    if(Object.keys(productsMade).length !== 0){
      setMade(true)
    }
  })
  let productsUpvoted = {}
  let productsCommented = {}

  const [made, setMade] = useState(false);

  user = useSelector((state)=> {
    if(state.session.user){
      return state.session.user.username === username  ? state.session.user : false
    } else return false
  })

  newUser = useSelector((state)=> {
    if(state.users[username]){
      return state.users[username] ? state.users[username] : false
    } else return false
  })


  const newUserRef = useRef(newUser)

  useEffect(()=>{
    if(!newUserRef.current){
        const queryUser = async () =>{
          await dispatch(getUser({ username }))
        }
        queryUser()
        newUserRef.current = newUser
      }
  }, [dispatch,  newUserRef, newUser, username])

  useSelector((state)=>{
    //Temporary fix
    if(state.session.user){
      productsMade = {}
      productsUpvoted = {}
      productsCommented = {}
      Object.keys(state.session.products).map((key)=>{
        return productsMade[key] = state.session.products[key]
      })

      Object.keys(state.session.upvotes).map((key)=>{
        return productsUpvoted[key] = state.session.upvotes[key]
      })

      Object.keys(state.session.comments).map((key)=>{
        return productsCommented[key] = state.session.comments[key]
      })
    }

  })


  if (!user){
    user = newUser.user
    if(user){
      productsMade = {}
      productsUpvoted = {}
      productsCommented = {}
      Object.keys(newUser.products).map((key)=>{
        return productsMade[key] = newUser.products[key]
      })

      Object.keys(newUser.upvotes).map((key)=>{
        return productsUpvoted[key] = newUser.upvotes[key]
      })

      Object.keys(newUser.comments).map((key)=>{
        return productsCommented[key] = newUser.comments[key]
      })
    }
  }

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

        {user.headerImage
          ?
          <div className='div__profile__styles' style={{
            backgroundImage: `url(${user.headerImage})`
          }} >
            <div className='div__profile__image'>
            <div className='div__profile__image__styles'>
              <img className ='image__profile__image'
              src={`${user.profileImage}`}
              alt='profile icon'
              >
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
          :
           <div className='div__profile__styles' >
          <div className='div__profile__image'>
            <div className='div__profile__image__styles'>
              <img className ='image__profile__image'
              src={`${user.profileImage}`}
              alt='profile icon'
              >
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
        }

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
              made ?
              <NavLink className='navlink__profile__nav__made'
                       activeClassName="navlink__profile__nav__made active"
                       exact={true}
                       to= {`/@${user.username}/made`}
              >
                {Object.keys(productsMade).length} MADE
              </NavLink>
               : (
                 Object.keys(productsMade).length ?
                <NavLink className='navlink__profile__nav__made'
                 activeClassName="navlink__profile__nav__made active"
                 exact={true}
                 to= {`/@${user.username}/made`}
                >
                  {Object.keys(productsMade).length} MADE
                </NavLink>
                : false
               )
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
        <div className='div__profile__products__activity'>
          <div className='div__profile__products__activity__style'>

            <div className='div__profile__products__activity__style__container'>
              <div className='div__profile__products__activity__header'>
                <span className='span__profile__activity'> Upvotes ({Object.keys(productsUpvoted).length})</span>
              </div>
              {Object.keys(productsUpvoted).map((key)=>{
                  return <Products key={key} products = {productsUpvoted[key]} profile = {true}/>
                })}

              <div className='div__profile__products__activity__header'>
                <span className='span__profile__activity'> Commented ({Object.keys(productsCommented).length})</span>
              </div>
              {Object.keys(productsCommented).map((key)=>{
                  return <Products key={key} products = {productsCommented[key]} profile = {true}/>
                })}
             </div>

            </div>
          </div>
      </Route>

      <Route path={`/@${user.username}/made`}>
        <div className='div__profile__products__made'>
            {Object.keys(productsMade).map((key)=>{
              return <Products key={key} products = {productsMade[key]} profile = {true}/>
            })}
          </div>
      </Route>
    </>
  )
};

export default Profile;
