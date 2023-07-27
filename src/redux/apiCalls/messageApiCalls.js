import { fetchMessagesSuccess, fetchMessagesFailure,
         updateMessageStatusSuccess, updateMessageStatusFailure
        } from "../actions/messageAction";

// Async Action Creator: Fetch all messages
export const getAllMessages = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:9000/message/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                dispatch(fetchMessagesSuccess(data.messages));
            })
            .catch((error) => {
                dispatch(fetchMessagesFailure(error.message));
            });
    };
};
// Action Creator: Update message status
export const updateMessageStatus = (messageId) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/message/${messageId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Dispatch success action with the updated message
                dispatch(updateMessageStatusSuccess(data.message));
            })
            .catch((error) => {
                dispatch(updateMessageStatusFailure(error.message));
            });
    };
};