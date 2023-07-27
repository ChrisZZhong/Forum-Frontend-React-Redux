// reducers.js

const initialState = {
    user: null,
    token : null,
    loading: false,
    error: null,
  };
  
const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        // login
        case 'LOGIN_REQUEST':
            return {
              ...state,
              loading: true,
              error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
              ...state,
              loading: false,
              token: action.payload,
              // user: action.payload,
            };
        case 'LOGIN_FAILURE':
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
        // signup
        case 'SignUp_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'SignUp_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case 'SignUp_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                user: null,
                token : null,
                loading: false,
                error: null
            }
      default:
        return state;
    }
  };
  
export default authenticationReducer;
  