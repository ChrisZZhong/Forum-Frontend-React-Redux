const initialState = {
    historyViewList:[],
    loading: false,
    error: '',
}

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_HISTORY_POSTS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_HISTORY_POSTS_SUCCESS':
            return {
                loading: false,
                historyViewList: action.payload,
                error: '',
            };
        case 'FETCH_HISTORY_POSTS_FAILURE':
            return {
                loading: false,
                historyViewList: [],
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                loading: false,
                historyViewList: [],
                error: '',
            }
        default:
            return state;
    }
};

export default historyReducer;