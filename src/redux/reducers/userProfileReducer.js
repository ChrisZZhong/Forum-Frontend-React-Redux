const initialState = {
    user: {},
    loading : false,
    error: null,
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_USER_PROFILE_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case 'FETCH_USER_PROFILE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case 'LOGOUT':
            return {
                user: {},
                loading : false,
                error: null,
            }
        default:
            return state;
    }
}
export default userProfileReducer;