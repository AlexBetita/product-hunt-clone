import { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore} from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import './Profile.css'

const Profile = () => {
  const { username } = useParams();
  let user;

  user = useSelector((state)=> {
    if(state.session.user){
      return state.session.user.username === username  ? state.session.user : false
    } else return false
  })

  if (!user){
    return (
      <div>
        User does not exists
      </div>
    )
  }

  // let activityPath = `/@${user.username}`
  // console.log(activityPath, )

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
              to={{
                pathname: `/@${user.username}`
              }}>
                ACTIVITY
              </NavLink>

              {
              user.products &&
              <NavLink className='navlink__profile__nav__made'
                       activeClassName="navlink__profile__nav__made active"
                       exact={true}
                to= {`/@${user.username}/made`}>
                {user.products.length} MADE
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
                to= {`/@${user.username}/followers`}>
                FOLLOWERS
              </NavLink>

            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Profile;
