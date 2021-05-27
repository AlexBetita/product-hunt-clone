import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const createUser = (user) => async (dispatch) => {
  const { profileImages, profileImage, fullName, username, email, password, headline, website } = user;
  const formData = new FormData();

  formData.append("fullName", fullName);
  formData.append("headline", headline);
  formData.append("website", website);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  // for multiple files
  if (profileImages && profileImages.length !== 0) {
    for (var i = 0; i < profileImages.length; i++) {
      formData.append("images", profileImages[i]);
    }
  }

  // for single file
  if (profileImage) formData.append("image", profileImage);

  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(setUser(data));
};



export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const editDetails = (user) => async (dispatch) => {
  const { fullName, headline, website } = user;
  const response = await csrfFetch('/api/users/edit', {
    method: 'PUT',
    body: JSON.stringify({
      fullName,
      headline,
      website
    }),
  });

  const data = await response.json();
  dispatch(setUser(data));
  return response;
};


export const editProfileImage = (user) => async (dispatch) => {
  const { profileImages, file } = user;
  const formData = new FormData();
  formData.append("fullName", 'jibbersigh');

  // for multiple files
  if (profileImages && profileImages.length !== 0) {
    for (var i = 0; i < profileImages.length; i++) {
      formData.append("images", profileImages[i]);
    }
  }

  if (file) formData.append("image", file);

  const res = await csrfFetch(`/api/users/profileImage`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  console.log('NOT COOOL')
  const data = await res.json();
  dispatch(setUser(data));
};

export const signup = (user) => async (dispatch) => {
  const { fullName, username, email, password, headline, website, profileImage } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      fullName,
      username,
      email,
      password,
      headline,
      website,
      profileImage
    }),
  });
  const data = await response.json();
  await dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = {
  user: null,
  upvotes: null,
  products: null,
  comments: null,
  discussions: null
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case SET_USER:
    //   return { ...state, user: action.payload };
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload.user;
      newState.upvotes = action.payload.upvotes;
      newState.products = action.payload.products;
      newState.comments = action.payload.comments;
      newState.discussions = action.payload.discussions;
      return {
        ...state,
        ...newState
      };
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      newState.upvotes = null;
      newState.products = null;
      newState.comments = null;
      newState.discussions = null;
      return {
        ...state,
        ...newState
      }
    default:
      return state;
  }
};

export default sessionReducer;
