const initialState = {
    messages: [],
    user: null,
    loading: false,
    error: null,
    message: {
        status: "",
        message: ""
    }
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //reducers.js接收到submissionForm,包含的type是‘MESSAGE_SUCCESS’最终指向了这里：
        //每一个type都是对store不同的修改，以下面这个type为例，使用后端返回的数据（action.payload)修改message（见第5行）
        case 'MESSAGE_SUCCESS':
            return {
                ...state,
                message: action.payload
            }
        //--------------------------- Lianyang ---------------------------
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                messages: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_MESSAGES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'UPDATE_MESSAGE_STATUS_SUCCESS':
            // Find the message in the state by its messageId and update its status
            const updatedMessages = state.messages.map((message) =>
                message.messageId === action.payload.messageId
                    ? { ...message, status: action.payload.status }
                    : message
            );
            return {
                ...state,
                messages: updatedMessages,
                loading: false,
                error: null,
            };
        case 'UPDATE_MESSAGE_STATUS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        //--------------------------- Lianyang ---------------------------
        case 'LOGOUT':
            return {
                messages: [],
                user: null,
                loading: false,
                error: null,
                message: {
                    status: "",
                    message: ""
                }
            }
        default:
            return state;
    }
};

export default messageReducer;
