export const getUserByEmailRequest = () => {
    return {
        type: 'getUserByEmailRequest',
    };
}

export const getUserByEmailSuccess = (user) => {
    return {
        type: 'getUserByEmailSuccess',
        payload: user,
    };
}

export const getUserByEmailFailure = (error) => {
    return {
        type: 'getUserByEmailFailure',
        payload: error,
    };
}
// user profile page
export const fetchUserProfileRequest = () => {
    return {
        type: 'FETCH_USER_PROFILE_REQUEST',
    };
}

export const fetchUserProfileSuccess = (user) => {
    return {
        type: 'FETCH_USER_PROFILE_SUCCESS',
        payload: user,
    };
}

export const fetchUserProfileFailure = (error) => {
    return {
        type: 'FETCH_USER_PROFILE_FAILURE',
        payload: error,
    };
}

export const logoutSuccess = () => {
    return {
        type: 'logoutSuccess',
    };
}

//--------------------------- jinzhou ⬇️ ----------------------------
export const fetchImageSuccess = (profileLink) =>{
    console.log("hi"+ profileLink);
    return {
        type: 'GET_DEFAULT_IMAGE_SUCCESS',
        payload: profileLink
    }
}
//--------------------------- jinzhou ⬆️  ---------------------------
//----------------------------- Lianyang  ----------------------------
// Action Creators
export const fetchUsersSuccess = (users) => ({
    type: 'FETCH_USERS_SUCCESS',
    payload: users,
});

export const updateUserStatusSuccess = (user) => ({
    type: 'UPDATE_USER_STATUS_SUCCESS',
    payload: user,
});

export const updateUserStatusFailure = (error) => ({
    type: 'UPDATE_USER_STATUS_FAILURE',
    payload: error,
});
export const promoteUserSuccess = (updatedUser) => ({
    type: 'PROMOTE_USER_SUCCESS',
    payload: updatedUser,
});
export const promoteUserFailure = (error) => ({
    type: 'PROMOTE_USER_FAILURE',
    payload: error,
});

//----------------------------- Lianyang  ----------------------------