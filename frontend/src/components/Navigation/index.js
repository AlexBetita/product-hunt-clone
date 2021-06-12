// frontend/src/components/Navigation/index.js
import {useState, useEffect} from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  // const [isScrolled, setIsScrolled] = useState(false);

  // let isScrolled = false;
  // let callFunction = true
  let sessionLinks;
  let handler;

  useEffect(()=>{
    const waitForDispatch = async() =>{
      await dispatch(getProducts(currentPage))
    }
    waitForDispatch();
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

  const setNextPage = async () => {
    setCurrentPage(currentPage + 1)
    await dispatch(getProducts(currentPage + 1))
  }

  // function getScrollXY() {
  //   var scrOfX = 0, scrOfY = 0;
  //   if( typeof( window.pageYOffset ) == 'number' ) {
  //       //Netscape compliant
  //       scrOfY = window.pageYOffset;
  //       scrOfX = window.pageXOffset;
  //   } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
  //       //DOM compliant
  //       scrOfY = document.body.scrollTop;
  //       scrOfX = document.body.scrollLeft;
  //   } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
  //       //IE6 standards compliant mode
  //       scrOfY = document.documentElement.scrollTop;
  //       scrOfX = document.documentElement.scrollLeft;
  //   }
  //   return [ scrOfX, scrOfY ];
  // }

  // function getDocHeight() {
  //     var D = document;
  //     return Math.max(
  //         D.body.scrollHeight, D.documentElement.scrollHeight,
  //         D.body.offsetHeight, D.documentElement.offsetHeight,
  //         D.body.clientHeight, D.documentElement.clientHeight
  //     );
  // }

  // document.addEventListener("scroll", async function (event) {
  //   console.log('what')
  //     if (getDocHeight() == getScrollXY()[1] + window.innerHeight) {
  //       await setNextPage()
  //     }
  // });

  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const limitFn = debounce(function() {
    function scroll(ev){
      const st = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        if((st+document.documentElement.clientHeight)>=document.documentElement.scrollHeight ){
            setNextPage()
        }
    }
    scroll()
  }, 1000);

  if(window.addEventListener){
    window.addEventListener('scroll', limitFn);
  }else if(window.attachEvent){
    window.attachEvent('onscroll', limitFn);
  }

  window.addEventListener('resize', limitFn);


  // if(window.addEventListener){
  //     window.addEventListener('scroll', scroll);
  //   }else if(window.attachEvent){
  //     window.attachEvent('onscroll', scroll);
  //   }

  // function scroll(ev){
  //   ev.preventDefault()
  //   const st = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
  //     if((st+document.documentElement.clientHeight)>=document.documentElement.scrollHeight ){
  //       setTimeout(async fn=>{
  //         await setNextPage()
  //       }, 1000)
  //       clearTimeout()
  //     }
  //   callFunction=true
  // }

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
        <button onClick={setNextPage}>
          NEXT PAGE
        </button>
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
