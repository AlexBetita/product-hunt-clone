import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './ProfileEdit.css'

const ProfileEdit = () => {

  const user = useSelector((state)=>{
    return state.session.user
  })

  if(!user){
    return (
      <>
        Please sign up
      </>
    )
  }

  return (
    <>
      <div className='div__edit__profile__nav__container'>
        <div className='div__edit__profile__nav__styles'>
          <div className='div__edit__profile__nav__flex'>

            <NavLink exact={true}
                     to='/my/settings/edit'
                     className='navlink__edit__profile__nav__settings'
                     activeClassName='navlink__edit__profile__nav__settings active_'
            >
              SETTINGS
            </NavLink>
            <NavLink exact={true}
                     to='/my/subscriptions/founder-club'
                     className='navlink__edit__profile__nav__subscriptions'
                     activeClassName='navlink__edit__profile__nav__subscriptions active_'
            >
              SUBSCRIPTIONS
            </NavLink>
            <NavLink exact={true}
                     to='/founder-club'
                     className='navlink__edit__profile__nav__founderclub'
                     activeClassName='navlink__edit__profile__nav__founderclub active_'
            >
              FOUNDER CLUB
            </NavLink>

          </div>
        </div>
      </div>

      <div className='div__edit__profile__details__container'>
        <div className='div__edit__profile__details__flex'>
          <div className='div__edit__profile__main__container'>
            <div className='div__edit__profile__mydetails__container'>

              <div className='div__edit__profile__mydetails__header'>
                My details
              </div>

              <div className='div__edit__profile__mydetails__form__container'>
                <form className='form__edit__profile__mydetails'>

                  <label className='label__edit__profile__name__styles'>
                    <div className='div__edit__profile__name__styles'>
                      Name
                    </div>
                    <input className='input__edit__profile__name' value={user.fullName}>

                    </input>
                  </label>

                  <label className='label__edit__profile__headline__styles'>
                    <div className='div__edit__profile__headline__styles'>
                      Headline
                    </div>
                    <input className='input__edit__profile__headline' value={user.headline}>

                    </input>
                  </label>

                  <label className='label__edit__profile__website__styles'>
                    <div className='div__edit__profile__website__styles'>
                      Website
                    </div>
                    <input className='input__edit__profile__website' value={user.website}>

                    </input>
                  </label>
                  <div className='div__edit__profile__mydetails__button__styles'>
                    <button className='button__edit__profile__mydetails'>
                      SAVE CHANGES
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>

          <div className='div__edit__profile__side__styles'>
            <div className='div__edit__profile__side__flex'>
              <div className='div__edit__profile__side__container'>
                <div className='div__edit__profile__side__profile__image__styles'>

                  <div className='div__edit__profile__side__profile__image__styles__2'>
                    <div className='div__edit__profile__side__image__styles'>
                      <img className='image__edit__profile__side'
                        src={user.profileImage}>
                      </img>
                    </div>
                  </div>

                  <span className='span__edit__profile__side__profilepicture'>
                    Profile Picture
                  </span>

                  <div className='div__edit__profile__side__syncprofile'>
                    Sync your profile picture with:
                  </div>

                  <div className='div__edit__profile__side__syncbutton'>
                    <button className='button__edit__profile__side__syncbutton'>
                       Pacebook
                    </button>
                  </div>

                  <span className='span__edit__profile__side__uploadimage'>
                    Upload an image
                  </span>

                  <div className='div__edit__profile__side__recommendedsize'>
                    Recommended size: 400x400px
                  </div>

                  <input type='file' hidden={true}>

                  </input>

                  <div className='div__edit__profile__side__uploadimage__container'>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ProfileEdit;
