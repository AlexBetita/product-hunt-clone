// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [headline, setHeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState([]);

  function isURL(str) {
    return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(str);
  }

  function isEmail(str){
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(str);
  }

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

    if(username.length < 3){
      newErrors.push('Username too short')
    } else if(username.length > 20){
      newErrors.push('Username too long, maximum is 20 chars')
    } else if(username !== username.toLowerCase()){
      newErrors.push('Username must be lower case')
    }

    if(headline.length > 40){
      newErrors.push('Headline too long, maximum is 40 chars')
    }

    if(website.length > 256){
      newErrors.push('Website Url is too long, please provide a shorter format, maximum is 256 chars')
    } else if (!isURL(website)){
      newErrors.push('Not a valid URL')
    }

    if(email.length < 3){
      newErrors.push('Email is to short to be valid')
    } else if(!isEmail(email)){
      newErrors.push('Not a valid URL')
    }


    if (!newErrors.length) {
      setErrors([]);
      await dispatch(sessionActions.createUser({ fullName, email, username, password, headline, website, profileImage }))
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
    <div>
      <h1>Sign up on Product Hunt Clone</h1>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Headline
          <textarea
            type="textarea"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </label>
        <label>
          Website
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
        <label>
          Upload a Profile Image
          <input type="file" onChange={updateFile} />
        </label>
        {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
