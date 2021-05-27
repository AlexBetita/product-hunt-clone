// frontend/src/components/Navigation/index.js
import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignUpFormModal';

import {logout} from '../../store/session';
import {getProducts} from '../../store/products';

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [showPopOver, setPopOver] = useState(false);

  let sessionLinks;
  let handler;

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  const openPopOver = () => {
    if(showPopOver) {
      setPopOver(false)
    } else {
      setPopOver(true)
    }
  }

  const closePopOver = () => {
    setPopOver(false)
  }

  handler = openPopOver

  if (sessionUser) {
    sessionLinks = (
        <ProfileButton user={sessionUser} handler={handler} closePopOver={closePopOver}/>
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

  const logoutPopover = (e) => {
    e.preventDefault();
    openPopOver();
    dispatch(logout());
    history.push('/')
  };

  return (
    <>
      <div className='div__navigation__styles'>
        <div className='div__navigation'>

        <NavLink exact to="/" onClick={closePopOver}>
          <img className='img__producthunt__icon'
              src='https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Product_Hunt-512.png'>
            </img>
        </NavLink>

          <div className='div__navigation__search__style'>
            <form className='form__navigation__search'>
              <label className='form__label__navigation__search'>
                  <i className="fa fa-search"></i>
                <input className='form__input__navigation__search' placeholder='Search Product Hunt'>
                </input>
                <button type='reset' hidden={true}>
                </button>
              </label>
            </form>
          </div>

          <div className='div__navigation__styles__links' onClick={closePopOver}>

            <NavLink to="/discussions" style={{ textDecoration: 'none', color: '#999A9C' }}>
              <div className='div__navigation__discussions'>
                  Discussions
                </div>
            </NavLink>

            <div className='div__navigation__deals' onClick={closePopOver}>
              <NavLink to="/deals" style={{ textDecoration: 'none', color: '#999A9C' }}>Deals</NavLink>
              </div>

              <div className='div__navigation__jobs' onClick={closePopOver}>
                <NavLink to="/jobs" style={{ textDecoration: 'none', color: '#999A9C' }}>Jobs</NavLink>
              </div>
              <div className='div__navigation__ship' onClick={closePopOver}>
                <NavLink to="/ship" style={{ textDecoration: 'none', color: '#999A9C' }}>Ship</NavLink>
              </div>
              <label className='label__navigation__dropdown'>
                ...
              </label>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </div>
      {showPopOver &&
        <>
          <div className='div__navigation__popover'>
            <ul className='ul__navigation__styles'>

              <NavLink
                className='navlink__popover__styles' onClick={closePopOver} to={`/@${sessionUser.username}`}>
                  <li className='li__navigation__style'>
                    My profile
                  </li>
                </NavLink>

              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/collections`}>My Collections</NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <hr className='hr__popover__class__separator'></hr>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/settings/edit`}>Settings</NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/subscriptions`}>Subscriptions</NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/founder-club`}>Founder Club</NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/oauth/applications`}>API Dashboard</NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <hr className='hr__popover__class__separator'></hr>
              </li>

              <li className='li__navigation__style' onClick={closePopOver}>
                <a onClick={logoutPopover}>Logout</a>
              </li>

            </ul>
            <div className='div__popover__triangle__grey'>
            </div>
            <div className='div__popover__triangle__white'>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default Navigation;
