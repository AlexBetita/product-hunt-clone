// frontend/src/components/Navigation/ProfileButton.js
import { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
// import Products from '../Products/index'

function ProfileButton({ user, handler, closePopOver }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div>
        <NavLink onClick={closePopOver}
            activeClassName='unactive'
            className='navlink__navigation__post__products' to='/posts/new'>Post</NavLink>
      </div>
      <div>
        <NavLink onClick={closePopOver} to='/notifications'>
          <img className='img__navigation__heartbeat'
            src='https://media.istockphoto.com/vectors/heart-human-vector-medicalpulse-beat-wave-heartbeat-grey-icon-vector-id1155635774'
          >
          </img>
        </NavLink>
      </div>
      <button className='button__navigation__profile__image' onClick={handler}>
        <img className='image__navigation__profile__image' src={user.profileImage}>
        </img>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
