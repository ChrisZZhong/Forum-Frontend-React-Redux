export const submitMessageForm = (data) => {
    return {
        type: "MESSAGE_SUCCESS",
        payload: data,
    };
};

// ---------------------------- Lianyang ------------------------------------
// Action Creators
export const fetchMessagesSuccess = (messages) => ({
    type: 'FETCH_MESSAGES_SUCCESS',
    payload: messages,
});
export const fetchMessagesFailure = (error) => ({
    type: 'FETCH_MESSAGES_FAILURE',
    payload: error,
});
export const updateMessageStatusSuccess = (message) => ({
    type: 'UPDATE_MESSAGE_STATUS_SUCCESS',
    payload: message,
});
export const updateMessageStatusFailure = (error) => ({
    type: 'UPDATE_MESSAGE_STATUS_FAILURE',
    payload: error,
});
// ---------------------------- Lianyang ------------------------------------