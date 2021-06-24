import { csrfFetch } from './csrf';

const LOAD_DISCUSSIONS = "discussions/LOAD_PRODUCTS";
// const REMOVE_DISCUSSION = "discussions/REMOVE_PRODUCT";
const ADD_DISCUSSION = "discussions/ADD_PRODUCT";
// const ADD_ONE_DISCUSSION = "discussions/ADD_ONE_PRODUCT";
const INITIAL_STATE = "discussions/INITIAL_STATE";

const load = (discussions) => ({
  type: LOAD_DISCUSSIONS,
  discussions
});

const add = (discussion) => ({
  type: ADD_DISCUSSION,
  discussion
});

// const remove = (discussionId) => ({
//   type: REMOVE_DISCUSSION,
//   discussionId
// });

export const resetState = () => ({
  type: INITIAL_STATE,
});

export const getDiscussions = () => async dispatch => {
  const response = await fetch(`/api/discussions`);
  if (response.ok) {
    const discussions = await response.json();
    dispatch(load(discussions));
  }
};

export const getOneDiscussion = id => async dispatch => {
  const response = await fetch(`/api/discussions/${id}`);

  if (response.ok) {
    const discussion = await response.json();
    dispatch(add(discussion));
  }
};

export const postDiscussion = payload => async dispatch => {
  const { discussion, message } = payload;


  const response = await csrfFetch(`/api/discussions`, {
    method: "POST",
    body: JSON.stringify({
      discussion,
      message
    }),
  })

  if (response.ok){
    const data = await response.json();
    dispatch(add(data))
    return data;
  }
}

export const updateDiscussion = payload => async dispatch => {
  const { discussion, message } = payload;

  const response = await csrfFetch(`/api/discussions/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify({
      discussion,
      message
    }),
  })

  if (response.ok){
    const data = await response.json();
    dispatch(add(data))
    return data;
  }
}


const initialState = {
  list: [],
}

const listDiscussions = (list) =>{

  const disList = []

  let max = list.length

  for(let i = max; i > 0; i--){
    disList.push(i)
  }

  return disList
}

const discussionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS: {
      const allDiscussions = {};

      action.discussions.forEach(discussion=>{
        allDiscussions[discussion.id] = discussion;
      });

      return {
        ...allDiscussions,
        ...state,
        list: listDiscussions(action.discussions)
      }
    }
    case ADD_DISCUSSION: {
      if(!state[action.discussion.id]){
        const newState = {
          ...state,
          [action.discussion.id]: action.discussion
        };
        newState.list.unshift(action.discussion.id)
        return newState
      }
      return {
        ...state,
        [action.discussion.id]: action.discussion
      };
    }
    case INITIAL_STATE:
      return {...initialState};
    default:
      return state;
  }
}

export default discussionReducer;
