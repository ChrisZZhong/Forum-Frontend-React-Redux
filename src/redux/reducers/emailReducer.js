const initialState = {
    loading : false,
    error: null,
    changeEmail : false,
    verifyEmail : false,
};

const emailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VERIFY_EMAIL_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
                verifyEmail: false,
            };
        case 'VERIFY_EMAIL_SUCCESS':
            return {
                ...state,
                loading: false,
                verifyEmail: true,
            }
        case 'VERIFY_EMAIL_FAILURE':
            return {
                ...state,
                error: action.payload,
            }
        case 'LOGOUT':
            return {
                loading : false,
                error: null,
            }
        case 'CHANGE_EMAIL':
            return {
                ...state,
                changeEmail: true,
            }
        default:
            return state;
    }
}
export default emailReducer;