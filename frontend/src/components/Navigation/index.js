// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignUpFormModal';

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='div__navigation__styles__login'>
          <LoginFormModal />
          <SignupFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        </div>
      </>
    );
  }

  return (
    <div className='div__navigation__styles'>
      <div className='div__navigation'>

       <NavLink exact to="/">
        <img className='img__producthunt__icon'
            src='https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Product_Hunt-512.png'>
          </img>
       </NavLink>

        <div className='div__navigation__search__style'>
          <form className='form__navigation__search'>
            <label className='form__label__navigation__search'>
              <img class='img__navigation__search'
                src='https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png'>
              </img>
              <input className='form__input__navigation__search' placeholder='Search Product Hunt'>
              </input>
              <button type='reset' hidden='true'>
              </button>
            </label>
          </form>
        </div>

        <div className='div__navigation__styles__links'>

          <NavLink exact to="/discussions" style={{ textDecoration: 'none', color: '#999A9C' }}>
            <div className='div__navigation__discussions'>
                Discussions
              </div>
          </NavLink>

          <div className='div__navigation__deals'>
            <NavLink exact to="/deals" style={{ textDecoration: 'none', color: '#999A9C' }}>Deals</NavLink>
            </div>

            <div className='div__navigation__jobs'>
              <NavLink exact to="/jobs" style={{ textDecoration: 'none', color: '#999A9C' }}>Jobs</NavLink>
            </div>
            <div className='div__navigation__ship'>
              <NavLink exact to="/ship" style={{ textDecoration: 'none', color: '#999A9C' }}>Ship</NavLink>
            </div>
            <label className='label__navigation__dropdown'>
              ...
            </label>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
