// reducers/userReducer.js
const initialState = {
    currentUser: {},
    users: [],
    loading : false,
    error: null,
  };
  
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        //--------------------------- zhicheng ---------------------------
        case 'getUserByEmailRequest':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'getUserByEmailSuccess':
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
            }
        case 'getUserByEmailFailure':
            return {
                ...state,
                error: action.payload,
            }
        //--------------------------- zhicheng ---------------------------
        //--------------------------- Lianyang ---------------------------
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
            };
        case 'UPDATE_USER_STATUS_SUCCESS':
            return {
                ...state,
                users: state.users.map((user) =>
                    user.email === action.payload.email
                        ? { ...user, type: action.payload.type }
                        : user
                ),
                error: null,
            };
        case 'UPDATE_USER_STATUS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'PROMOTE_USER_SUCCESS':
            console.log(action.payload)
            return {
                ...state,
                users: state.users.map((user) =>
                    user.email === action.payload.email
                        ? { ...user, type: action.payload.type }
                        : user
                ),
                error: null,
            };
        case 'PROMOTE_USER_FAILURE':
            return {
                ...state,
                error: action.payload,
            };

        //--------------------------- Lianyang ---------------------------
        //--------------------------- jinzhou ⬇️ ----------------------------
        case 'GET_DEFAULT_IMAGE_SUCCESS':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    profileImageURL: action.payload,
                },
            };
        case 'LOGOUT':
            console.log('case logout in userReducer')
            return {
                currentUser: null,
                users: [],
                loading : false,
                error: null,
            }
        //----------------------- jinzhou ⬆️  ---------------------------
      default:
        return state;
    }
};
  
export default userReducer;
  