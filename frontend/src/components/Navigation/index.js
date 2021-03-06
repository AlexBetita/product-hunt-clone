// frontend/src/components/Navigation/index.js
import {useState, useEffect, useRef} from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import _ from 'lodash'
// import {ReactComponent as ReactLogo} from '../../svg/email.svg'
import linkedin from '../../img/linkedin_16.png'
import email from '../../img/email_16.png'
import github from '../../img/github_16.png'
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignUpFormModal';

import { logout } from '../../store/session';
import { getProducts } from '../../store/products';
import product_hunt_icon from '../../img/product_hunt_icon.png'

import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const history = useHistory();
  const elementRef = useRef();
  const popOver = useRef();
  const sessionUser = useSelector(state => state.session.user);
  const [showPopOver, setPopOver] = useState(false);

  let pageCounter = 1
  let sessionLinks;
  let handler;

  useEffect(()=>{
    const waitForDispatch = async() =>{
      await dispatch(getProducts(pageCounter))
    }
    waitForDispatch();

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };

  }, [dispatch, pageCounter])

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

  const handleClick = e =>{
    try {
      if(popOver.current.contains(e.target)){
        return
      }
      setPopOver(false)
    } catch {
      //
    }
  }

  const openEmail = () =>{
    window.open('mailto:alexbheb25@gmail.com')
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

  const logoutPopover = async (e) => {
    e.preventDefault();
    const elements = document.querySelectorAll('.voted__true')
    elements.forEach((el)=>{
      el.classList.remove('voted__true')
    })
    openPopOver();
    await dispatch(logout());
    history.push('/')
  };

  // const setNextPage = async () => {
  //   await dispatch(getProducts(pageCounter + 1))
  //   pageCounter += 1
  // }

  // function scroll(ev){
  //   const st = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
  //   if((st+document.documentElement.clientHeight) >= document.documentElement.scrollHeight ){
  //     setNextPage()
  //   }
  // }


  function activateProgress(){
    closePopOver()
    elementRef.current.classList.add('active')
    setTimeout(fn=>{
      elementRef.current.classList.remove('active')
    }, 200)
  }


  return (
    <>
      <div id='nprogress' ref={elementRef}></div>
      <div className='div__navigation__styles'>
        <div className='div__navigation'>

        <NavLink exact to="/" onClick={activateProgress}>
          <img className='img__producthunt__icon'
              src={product_hunt_icon}
              alt='product hunt icon'
              >
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

          <div className='div__navigation__styles__links'>

            <NavLink to="/discussions" style={{ textDecoration: 'none', color: '#999A9C' }}
              onClick={activateProgress}
              >
              <div className='div__navigation__discussions'>
                   Discussions
                </div>
            </NavLink>

              <label className='label__navigation__dropdown'>
                Personal
              </label>

            <div className='div__navigation__deals'>
              <img src={email} alt="email icon" onClick={()=> openEmail()}></img>
              </div>

              <div className='div__navigation__jobs'>
                <Link to="/" style={{ textDecoration: 'none', color: '#999A9C' }}
                  onClick={()=>{
                    window.location.href = 'https://github.com/AlexBetita/'
                  }}
                  >
                    <img src={github} alt="github icon"></img>
                  </Link>
              </div>
              <div className='div__navigation__ship'>
                <NavLink to="/" style={{ textDecoration: 'none', color: '#999A9C' }}
                  onClick={()=>{
                    window.location.href = 'https://www.linkedin.com/in/alex-betita/'
                  }}
                  >
                    <img src={linkedin} alt='linkedin icon'></img>
                  </NavLink>
              </div>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </div>
      {showPopOver &&
        <>
          <div className='div__navigation__popover' ref={popOver}>
            <ul className='ul__navigation__styles'>

             <li className='li__navigation__style'>
              <NavLink
                className='navlink__popover__styles' to={`/@${sessionUser.username}`}>
                  My Profile
                </NavLink>
              </li>

              <li className='li__navigation__style' onClick={closePopOver}>
                 Personal
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <hr className='hr__popover__class__separator'></hr>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={'/'}
                  onClick={()=>{
                    window.location.href = 'https://github.com/AlexBetita/'
                  }}>
                  <img src={github} alt="github icon"></img>
                </NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/`}
                onClick={()=>{
                  window.location.href = 'https://www.linkedin.com/in/alex-betita/'
                }}>
                  <img src={linkedin} alt='linkedin icon'></img>
                </NavLink>
              </li>
              <li className='li__navigation__style' onClick={closePopOver}>
                  <img src={email} alt="email icon" className='img__email__popup' onClick={()=> openEmail()}></img>
              </li>
              {/* <li className='li__navigation__style' onClick={closePopOver}>
                <NavLink className='navlink__popover__styles' to={`/oauth/applications`}>API Dashboard</NavLink>
              </li> */}
              <li className='li__navigation__style' onClick={closePopOver}>
                <hr className='hr__popover__class__separator'></hr>
              </li>

              <li className='li__navigation__style' onClick={closePopOver}>
                <a className='a__navigation__logout' href='/' onClick={logoutPopover}>Logout</a>
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
