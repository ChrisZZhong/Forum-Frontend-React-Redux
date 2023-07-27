export const fetchHistoryPostsSuccess = (data) => ({
    type: 'FETCH_HISTORY_POSTS_SUCCESS',
    payload: data,
});

export const fetchHistoryPostsRequest = () => ({
    type: 'FETCH_HISTORY_POSTS_REQUEST'
});

export const fetchHistoryPostsFailure = (error) => ({
    type: 'FETCH_HISTORY_POSTS_FAILURE',
    payload: error,
});

