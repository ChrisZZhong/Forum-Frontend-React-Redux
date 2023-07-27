export const fetchPostsSuccess = (data) => ({
    type: 'FETCH_POSTS_SUCCESS',
    payload: data,
});

export const fetchPostsRequest = () => ({
    type: 'FETCH_POSTS_REQUEST'
});

export const fetchPostsFailure = (error) => ({
    type: 'FETCH_POSTS_FAILURE',
    payload: error,
});
//update status
export const updatePostStatusSuccess = (data) => ({
    type: 'UPDATE_POST_STATUS_SUCCESS',
    payload: data,
});

export const updatePostStatusRequest = () => ({
    type: 'UPDATE_POST_STATUS_REQUEST'
});

export const updatePostStatusFailure = (error) => ({
    type: 'UPDATE_POST_STATUS_FAILURE',
    payload: error,
});
//top replied posts
export const fetchTopPostsSuccess = (data) => ({
    type: 'FETCH_TOP_POSTS_SUCCESS',
    payload: data,
});
export const fetchTopPostsRequest = () => ({
    type: 'FETCH_TOP_POSTS_REQUEST'
});

export const fetchTopPostsFailure = (error) => ({
    type: 'FETCH_TOP_POSTS_FAILURE',
    payload: error,
});
//unpublished posts
export const fetchUnpublishedPostSuccess = (data) => ({
    type: 'FETCH_NON_PUBLISHED_POSTS_SUCCESS',
    payload: data,
});
export const fetchUnpublishedPostRequest = () => ({
    type: 'FETCH_NON_PUBLISHED_POSTS_REQUEST'
});

export const fetchUnpublishedPostFailure = (error) => ({
    type: 'FETCH_NON_PUBLISHED_POSTS_FAILURE',
    payload: error,
});
//banned posts
export const fetchBannedPostRequest = () => ({
    type: 'FETCH_BANNED_REQUEST'
});

export const fetchBannedPostFailure = (error) => ({
    type: 'FETCH_BANNED_FAILURE',
    payload: error,
});

export const fetchBannedPostSuccess = (data) => ({
    type: 'FETCH_BANNED_SUCCESS',
    payload: data,
});
//deleted posts
export const fetchDeletedPostRequest = () => ({
    type: 'FETCH_DELETED_REQUEST'
});

export const fetchDeletedPostFailure = (error) => ({
    type: 'FETCH_DELETED_FAILURE',
    payload: error,
});

export const fetchDeletedPostSuccess = (data) => ({
    type: 'FETCH_DELETED_SUCCESS',
    payload: data,
});

