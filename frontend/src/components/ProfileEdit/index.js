import React, {useState, useEffect, useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";

import './ProfileEdit.css'

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const elementRef = useRef();

  const user = useSelector((state)=>{
    return state.session.user
  })

  const [fullName, setFullName] = useState(user?.fullName);
  const [headline, setHeadline] = useState(user?.headline);
  const [website, setWebsite] = useState(user?.website);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [inputElement, setInputElement] = useState(null);
  const [spanStatus, setSpanStatus] = useState(true);
  const [spanSaving, setSpanSaving] = useState(true);
  const [spanUpdated, setSpanUpdated] = useState(true);
  const [disableButton, setDisableButton] = useState(false);

  const triggerOnChange = function (e){
    const inputField = inputElement;
    inputField.click()
  }

  const updateFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await dispatch(sessionActions.editProfileImage({file}))
      await setProfileImage(user?.profileImage)
    };
  }

  useEffect(() => {
    setInputElement(elementRef.current);
    return () => {}
  }, [profileImage])

  if(!user){
    return (
      <>
        Please sign up
      </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDisableButton(true)
    await setSpanUpdated(true)
    await setSpanStatus(false)
    await setSpanSaving(false)

    await dispatch(sessionActions.editDetails({fullName, headline, website}))

    await setSpanSaving(true)
    await setSpanUpdated(false)
    await setDisableButton(false)
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

                <form onSubmit={handleSubmit}>

                  <label className='label__edit__profile__name__styles'>
                    <div className='div__edit__profile__name__styles'>
                      Name
                    </div>

                    <input
                          className='input__edit__profile__name' value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          />
                  </label>

                  <label className='label__edit__profile__headline__styles'>
                    <div className='div__edit__profile__headline__styles'>
                      Headline
                    </div>
                    <input
                          className='input__edit__profile__headline' value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          required
                          />
                  </label>

                  <label className='label__edit__profile__website__styles'>
                    <div className='div__edit__profile__website__styles'>
                      Website
                    </div>
                    <input
                          className='input__edit__profile__website' value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          />
                  </label>

                  <div className='div__edit__profile__mydetails__button__styles' disabled={disableButton}>
                    <button type="submit" className='button__edit__profile__mydetails' disabled={disableButton}>
                      SAVE CHANGES
                    </button>

                    <span className='span__edit__profile__status' hidden={spanStatus}>
                      <span hidden={spanUpdated}>
                        <span>👍</span>
                          {' Updated!'}
                      </span>

                      <span hidden={spanSaving}>
                        <span>💾</span>
                          {' Saving..'}
                      </span>

                    </span>
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
                        src={user?.profileImage}>
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

                  <span className='span__edit__profile__side__uploadimage' onClick={triggerOnChange}>
                    Upload an image
                  </span>

                  <div className='div__edit__profile__side__recommendedsize'>
                    Recommended size: 400x400px
                  </div>

                  <input
                        className='input__edit__profile__side__uploadprofileimage'
                        type='file'
                        hidden={true}
                        ref={elementRef}
                        onChange={updateFile} />

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
