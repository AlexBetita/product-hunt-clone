import { csrfFetch } from './csrf';
import {REMOVE_PRODUCT, ADD_PRODUCT, VOTE_PRODUCT} from './products'

const SET_USER = 'session/setUser';
export const REMOVE_USER = 'session/removeUser';

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


export const demo = () => async (dispatch) => {
  const response = await fetch('/api/session/demo')
  const data = await response.json();
  dispatch(setUser(data));
  return response
}

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

  const data = await res.json();
  dispatch(setUser(data));
};

// export const signup = (user) => async (dispatch) => {
//   const { fullName, username, email, password, headline, website, profileImage } = user;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       fullName,
//       username,
//       email,
//       password,
//       headline,
//       website,
//       profileImage
//     }),
//   });
//   const data = await response.json();
//   await dispatch(setUser(data));
//   return response;
// };

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const removeUpvotes = (id, type, state) => {
  for (const key in state.upvotes){
    if (type === 'product'){
      if (state.upvotes[key].upvoteableId === id && state.upvotes[key].upvoteableType === 'product'){
        delete state.upvotes[key]
      }
    } else if (type === 'comment'){
      if (state.upvotes[key].upvoteableId === id && state.upvotes[key].upvoteableType === 'comment'){
        delete state.upvotes[key]
      }
    } else if (type === 'discussion'){
      if (state.upvotes[key].upvoteableId === id && state.upvotes[key].upvoteableType === 'discussion'){
        delete state.upvotes[key]
      }
    }
  }
}

const removeDiscussion = (id, state) => {
  delete state.discussions[id]
}

const removeComments = (id, type, state) => {
  for (const key in state.comments){
    if (type === 'product'){
      if (state.comments[key].commentableId === id && state.comments[key].commentableType === 'product'){
        delete state.comments[key]
      }
    } else if (type === 'discussion'){
      if (state.comments[key].commentableId === id && state.comments[key].commentableType === 'discussion'){
        delete state.comments[key]
      }
    }
  }
}


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
    case SET_USER:{
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
    }
    case ADD_PRODUCT:{
      newState = {
        ...state
      }
      newState.products[action.product.id] = action.product
      return newState
    }
    case REMOVE_PRODUCT:{
      delete state.products[action.productId]
      removeComments(action.productId, 'product', state)
      removeUpvotes(action.productId, 'product', state)
      newState = {
        ...state
      }
      return newState
    }
    case REMOVE_USER:{
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
    }
    case VOTE_PRODUCT:{
      newState = {
        ...state
      }

      if (action.product.result === 'upvote'){
        newState.upvotes[action.product.id] = action.product.data
        if(newState.products[action.product.id]){
          newState.products[action.product.id].Upvotes.push(action.product.upvote)
        }
        if(newState.comments[action.product.id]){
          newState.comments[action.product.id].Upvotes.push(action.product.upvote)
        }
      } else if (action.product.result === 'downvote'){
        delete newState.upvotes[action.product.id]

        for (const [key, value] of Object.entries(newState.products)){
          value.Upvotes.forEach((upvote, index)=>{
              if(upvote.upvoteableId === parseInt(action.product.id) && upvote.upvoteableType === 'product'){
                newState.products[key].Upvotes.splice(index, 1)
              }
            })
        }

        for (const [key, value] of Object.entries(newState.comments)){
          value.Upvotes.forEach((upvote, index)=>{
              if(upvote.upvoteableId === parseInt(action.product.id) && upvote.upvoteableType === 'product'){
                newState.comments[key].Upvotes.splice(index, 1)
              }
            })
        }
      }
      return newState
    }
    default:
      return state;
  }
};

export default sessionReducer;
