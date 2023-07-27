// actions.js

// 同步action creator
export const loginRequest = () => {
    return {
      type: 'LOGIN_REQUEST',
    };
  };
  
export const loginSuccess = (token) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: token,
    };
};

export const loginFailure = (error) => {
    return {
      type: 'LOGIN_FAILURE',
      payload: error,
    };
};
  
export const signUpRequest = () => {
    return {
        type: 'SignUp_REQUEST',
    };
}

export const signUpSuccess = (user) => {
    return {
        type: 'SignUp_SUCCESS',
        payload: user,
    };
}

export const signUpFailure = (error) => {
    return {
        type: 'SignUp_FAILURE',
        payload: error,
    };
}
export const logoutSuccess = () => {
    return {
        type: 'LOGOUT',
    };
};

  