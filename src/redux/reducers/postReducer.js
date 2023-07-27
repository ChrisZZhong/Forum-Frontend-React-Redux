// src/redux/postsReducer.js
  const initialState = {
    loading: false,
    posts: [],
    error: '',
    topRepliesPosts:[],
    nonPublishedPosts:[],
    adminBannedPostList:[],
    adminDeletedPostList:[],
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_POSTS_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_POSTS_SUCCESS':
        return {
          ...state,
          loading: false,
          posts: action.payload,
          error: '',
        };
      case 'FETCH_POSTS_FAILURE':
        return {
          ...state,
          loading: false,
          posts: [],
          error: action.payload,
        };
      case 'FETCH_TOP_POSTS_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_TOP_POSTS_SUCCESS':
        return {
          ...state,
          loading: false,
          topRepliesPosts: action.payload,
          error: '',
        };
      case 'FETCH_TOP_POSTS_FAILURE':
        return {
          ...state,
          loading: false,
          topRepliesPosts: [],
          error: action.payload,
        };
      case 'FETCH_NON_PUBLISHED_POSTS_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_NON_PUBLISHED_POSTS_SUCCESS':
        return {
          ...state,
          loading: false,
          nonPublishedPosts: action.payload,
          error: '',
        };
      case 'FETCH_NON_PUBLISHED_POSTS_FAILURE':
        return {
          ...state,
          loading: false,
          nonPublishedPosts: [],
          error: action.payload,
        };
      case 'FETCH_BANNED_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_BANNED_FAILURE':
        return {
          ...state,
          loading: false,
          adminBannedPostList: [],
          error: action.payload,
        };
      case 'FETCH_BANNED_SUCCESS':
        return {
          ...state,
          loading: false,
          adminBannedPostList: action.payload,
          error: '',
        };
      case 'FETCH_DELETED_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_DELETED_FAILURE':
        return {
          ...state,
          loading: false,
          adminDeletedPostList: [],
          error: '',
        };
      case 'FETCH_DELETED_SUCCESS':
        return {
          ...state,
          loading: false,
          adminDeletedPostList: action.payload,
          error: '',
        };
      case 'LOGOUT':
        return {
          loading: false,
          posts: [],
          error: '',
          topRepliesPosts:[],
        }
      default:
        return state;
    }
  };
  
  export default postsReducer;
  