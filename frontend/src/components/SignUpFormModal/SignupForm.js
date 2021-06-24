// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import kitty from '../../img/kitty.png'
import loading_signup from '../../img/loading_signup.png'

import './SignupFormModal.css';

function SignupForm() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [headline, setHeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false)
  // if (sessionUser) return <Redirect to="/" />;

  const history = useHistory();

  function isURL(str) {
    return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(str);
  }

  function isEmail(str){
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(str);
  }

  // async function ifExists(str, type){
  //   if(type === 'username'){
  //     const response = await fetch(`/api/users/checkUser/${str}`)
  //     const data = await response.json();
  //     return data['exist']
  //   } else if (type === 'email'){
  //     const response = await fetch(`/api/users/checkEmail/${str}`)
  //     const data = await response.json();
  //     return data['exist']
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = [];

    if(password !== confirmPassword){
      newErrors.push('Confirm Password field must be the same as the Password field')
    }

    if(fullName.length < 4){
      newErrors.push('Full Name is too short, min 4 chars')
    } else if(fullName.length > 40){
      newErrors.push('Full Name is too long, max 40 chars')
    }

    if(email.length < 3){
      newErrors.push('Email is to short to be valid')
    } else if(!isEmail(email)){
      newErrors.push('Not a valid email')
    }
    // else if(await ifExists(email, 'email')){
    //   newErrors.push('Email already exists')
    // }

    if(username.length < 3){
      newErrors.push('Username too short')
    } else if(username.length > 20){
      newErrors.push('Username too long, maximum is 20 chars')
    } else if(username !== username.toLowerCase()){
      newErrors.push('Username must be lower case')
    }
    // else if(await ifExists(username, 'username')){
    //   newErrors.push('Username already exists')
    // }

    if(headline.length > 40){
      newErrors.push('Headline too long, maximum is 40 chars')
    }

    if(website.length > 0){
      if(website.length > 256){
        newErrors.push('Website Url is too long, please provide a shorter format, maximum is 256 chars')
      } else if (!isURL(website)){
        newErrors.push('Not a valid URL, gotta have http:// or https://')
      }
    }

    setErrors(newErrors)
    if (!newErrors.length) {
      setErrors([]);
      await dispatch(sessionActions.createUser({ fullName, email, username,
                                                 password, headline,
                                                 website, profileImage }))
        .then(history.push('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            await setLoading(false)
          }
        });
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  return (
    <div className='div__signup__modal__container'>
      <div className='div__styles__signup__modal'>
        <div className='div__styles__login__image__modal'>
          <img className='image__signup__modal'
            src={kitty}
            alt='kitty icon'
            >
          </img>
        </div>
        <h1 className='h1__signup__modal__sign'>
            Sign up on Product Hunt Clone
        </h1>
        <p className='p__signup__modal__sign'>
          Join our community of friendly folks discovering and sharing the latest products in the world.
        </p>
        <div className='div__form__signup__modal__styles'>
            <ul>
              {errors.map((error, idx) =>
              <li key={idx} className="error">{error}</li>)
              }
          </ul>
          <form onSubmit={handleSubmit}>
              <label className='label__fullname__signup__modal'>
                Full Name
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </label>
              <label className='label__email__signup__modal'>
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className='label__username__signup__modal'>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label className='label__password__signup__modal'>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label className='label__confirmpassword__signup__modal'>
                Confirm Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <label className='label__headline__signup__modal'>
                Headline
                <textarea
                  type="textarea"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </label>
              <label className='label__website__signup__modal'>
                Website
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
              <label className='label__profileimage__signup__modal'>
                Upload a Profile Image
                <input className='input__profileimage__signup__modal' type="file" onChange={updateFile} />
              </label>
              {/* <label>
                  Multiple Upload
                  <input
                    type="file"
                    multiple
                    onChange={updateFiles} />
                </label> */}
              {loading &&
                <>
                <button className='button__form__signup__modal--disabled' disabled type="submit">
                  <img
                      className='image__form__signup__loading__image'
                      src={loading_signup}
                      alt='loading icon'
                      >
                  </img>
                </button>
                <div className='div__form__signup__loading__text'>
                  Loading...
                </div>
                </>
              }
              {!loading &&
                <button className='button__form__signup__modal' type="submit">Sign Up</button>
              }

          </form>
        </div>
        <p className="p__signup__modal__sign__2">
          Meow'll never post to any of your accounts without your permission.
        </p>
      </div>
      {/* <div>
        {sessionUser && (
          <div>
            <h1>{sessionUser.username}</h1>
            <img
              style={{ width: "150px" }}
              src={sessionUser.profileImage}
              alt="profile"
            />
          </div>
        )}
      </div> */}
    </div>
  );
}

export default SignupForm;
