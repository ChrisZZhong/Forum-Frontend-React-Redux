import {
    fetchUserProfileFailure,
    fetchUserProfileRequest, fetchUserProfileSuccess,
    getUserByEmailFailure,
    getUserByEmailRequest,
    getUserByEmailSuccess
} from "../actions/userAction";
import { fetchUsersSuccess,
    updateUserStatusSuccess, updateUserStatusFailure,
    promoteUserSuccess, promoteUserFailure } from "../actions/userAction";

// ---------------------------- Zhicheng ------------------------------------
export const fetchUserProfile = (userId) => {
    return (dispatch) => {
        dispatch(fetchUserProfileRequest());
        fetch('http://localhost:9000/user/' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => response.json())
            .then(data => {
                if (data.status === "OK") {
                    const user = data.user;
                    if (user) {
                        dispatch(fetchUserProfileSuccess(user));
                    }
                } else {
                    const error = data.message;
                    dispatch(fetchUserProfileFailure(error));
                }
            }).catch((error) => {
                dispatch(fetchUserProfileFailure(error));
            });
    }
}

export const getUserByEmail = (email) => {
    return (dispatch) => {
        dispatch(getUserByEmailRequest());
        fetch('http://localhost:9000/user/info?username=' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
            },
        })
            .then((UserResponse) => UserResponse.json())
            .then(data => {
                if (data.status === "OK") {
                    const user = data.user;
                    // console.log(data);
                    // localStorage.removeItem('currentUser');
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    dispatch(getUserByEmailSuccess(user));
                    // console.log(localStorage.getItem('currentUser'));
                } else {
                    const error = data.message;
                    dispatch(getUserByEmailFailure(error));
                }
            }).catch((error) => {
                dispatch(getUserByEmailFailure(error));
            });
    }
}
export const updateUserImageURL = (userId, imageURL) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: imageURL, // Send the username in the request body
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then((data) => {
                // Dispatch success action with the updated user (optional)
                const user = data.user;
                dispatch(getUserByEmailSuccess(user));
                // localStorage.removeItem('currentUser');
                // localStorage.setItem('currentUser', JSON.stringify(user));
                console.log(user);
            })
            .catch((error) => {
            });
    }
}


// ---------------------------- Zhicheng ------------------------------------
// ---------------------------- Lianyang ------------------------------------
// Async Action Creator: Fetch all users
export const getAllUsers = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:9000/user', {
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
                dispatch(fetchUsersSuccess(data.users));
            })
            .catch((error) => {
                // You can add a fetchUsersFailure action here if needed
                console.error('Error fetching users:', error);
            });
    };
};

export const updateUserStatus = (username) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/user/active`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'text/plain',
                Authorization: `Bearer ${token}`,
            },
            body: username, // Send the username in the request body
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Dispatch success action with the updated user (optional)
                dispatch(updateUserStatusSuccess(data.user));
            })
            .catch((error) => {
                dispatch(updateUserStatusFailure(error.message));
            });
    };
};

export const promoteUser = (username) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/user/promote`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'text/plain',
                Authorization: `Bearer ${token}`,
            },
            body: username,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Dispatch success action with the updated user (optional)
                dispatch(promoteUserSuccess(data.user));
            })
            .catch((error) => {
                dispatch(promoteUserFailure(error.message));
            });
    };
};

// ---------------------------- Lianyang ------------------------------------