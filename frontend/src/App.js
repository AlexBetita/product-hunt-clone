// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import Profile from "./components/Profile";
import ProfileEdit from './components/ProfileEdit';
import ProductDetails from './components/ProductDetails';
import Post from './components/Post';
import EditProductPage from './components/EditProductPage';
import DiscussionsPage from './components/DiscussionsPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path='/@:username'>
            <Profile />
          </Route>
          <Route path='/my/settings/edit'>
            <ProfileEdit />
          </Route>
          <Route path='/my/subscriptions/founder-club'>
            <ProfileEdit />
          </Route>
          <Route path='/founder-club'>
            <ProfileEdit />
          </Route>
          <Route exact path='/posts/new'>
            <Post />
          </Route>
          <Route path='/posts/:id'>
            <ProductDetails />
          </Route>
          <Route path='/product/:id/edit'>
            <EditProductPage />
          </Route>
          <Route path='/discussions'>
            <DiscussionsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
