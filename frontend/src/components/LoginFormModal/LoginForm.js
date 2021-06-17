// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const loginDemo = (e) =>{
    e.preventDefault()
    setErrors([]);
    return dispatch(sessionActions.demo())
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className='div__login__modal__container'>
      <div className='div__styles__login__modal'>
        <div className='div__login__image__modal'>
          <img className='image__login__modal'
            src='https://ph-static.imgix.net/category-tech/kitty.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&h=92&fit=max&dpr=1'>
          </img>
        </div>
        <h1 className='h1__login__modal__sign'>
          Log in Product Hunt Clone
        </h1>
        <p className='p__login__modal__sign'>
        Join our community of friendly folks discovering and sharing the latest products in the world.
        </p>
        <div className='div__form__login__modal__styles'>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx} className="error">{error}</li>
              ))}
            </ul>
            <label className='label__login__modal'>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label className='label__password__login__modal'>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className='button__form__login__modal' type="submit">Log In</button>
          </form>
          <button className='button__form__login__modal' onClick={loginDemo}>DEMO</button>
        </div>
        <p className='p__login__modal__sign__2'>
         Meow'll never post to any of your accounts without your permission.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
