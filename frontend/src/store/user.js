import { csrfFetch } from "./csrf";

const ADD_USER = 'session/ADD_USER'

const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

export const getUser = (user) => async (dispatch) => {
    const { username } = user;
    const response = await csrfFetch(`/api/users/${username}`)
    const data = await response.json();
    dispatch(addUser(data))
    return data
}

const initialState = {}

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case ADD_USER:
            newState = {
                ...state
            }
            newState[action.payload.user.username] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default userReducer;
