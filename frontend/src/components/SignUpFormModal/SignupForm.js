// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupFormModal.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [headline, setHeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = [];

    if(password !== confirmPassword){
      newErrors.push('Confirm Password field must be the same as the Password field')
    }

    if(username !== username.toLowerCase()){
      newErrors.push('Username must be lower case')
    }

    if (!newErrors.length) {
      setErrors([]);
      return dispatch(sessionActions.createUser({ fullName, email, username, password, headline, website, profileImage }))
        .then(() => {
          setFullName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setUsername("");
          setHeadline("");
          setWebsite("");
          setProfileImage(null);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            newErrors = data.errors;
            setErrors(newErrors);
          }
        });
    }

    setErrors(newErrors)

    return setErrors
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  return (
    <div className='div__signup__modal__container'>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='div__styles__signup__modal'>
        <div className='div__styles__login__image__modal'>
          <img className='image__signup__modal'
            src='https://ph-static.imgix.net/category-tech/kitty.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&h=92&fit=max&dpr=1'>
          </img>
        </div>
        <h1 className='h1__signup__modal__sign'>
            Sign up on Product Hunt Clone
        </h1>
        <p className='p__signup__modal__sign'>
          Join our community of friendly folks discovering and sharing the latest products in the world.
        </p>
        <div className='div__form__signup__modal__styles'>
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
              <button className='button__form__signup__modal' type="submit">Sign Up</button>
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
