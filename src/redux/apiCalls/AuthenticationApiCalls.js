import {
    loginFailure,
    loginRequest,
    loginSuccess,
    signUpFailure,
    signUpRequest,
    signUpSuccess
} from "../actions/authenticationAction"
import {getUserByEmail} from "./userApiCalls";
import {getDefaultProfile} from "./fileApiCalls";
import {changeEmailSuccess, verifyEmailFailure, verifyEmailRequest, verifyEmailSuccess} from "../actions/emailActions";
import {logoutSuccess} from "../actions/userAction";
import {useSelector} from "react-redux";


// 异步action creator，使用Thunk来处理异步操作
export const login = (email, password) => {
    return async (dispatch) => {
        localStorage.removeItem('token');
        dispatch(loginRequest());
        fetch('http://localhost:9000/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        })
            .then((TokenResponse) => TokenResponse.json())
            .then(data => {
                if (data.status === "success") {
                    const token = data.token;
                    dispatch(getUserByEmail(email));
                    localStorage.setItem('token', token);
                    dispatch(loginSuccess(token));
                } else {
                    const error = data.message;
                    dispatch(loginFailure(error));
                }
                })
            .catch((error) => {
                    dispatch(loginFailure(error));
        });

    };
};

export const signUp = (email, password, firstName, lastName) => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch(signUpRequest());
        // set default image url
        const accessKey = "AKIAX427KBRWPSFWT5OR";
        const accessSecret =  "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";
        // const userImage = `https://mys3-fbaaf7c7-cf4c-f494-cbf0-48a430711e78.s3.us-west-2.amazonaws.com/user/0/defaultProfile.png?AWSAccessKeyId=AKIAX427KBRWPSFWT5OR&Signature=xgl7f47T2YcJOV9kLnkegpQHC3IfdlU3HMZZV/no`;
        const url = `https://mys3-fbaaf7c7-cf4c-f494-cbf0-48a430711e78.s3.us-west-2.amazonaws.com/user/0/defaultProfile.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAX427KBRWPSFWT5OR%2F20130524%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20130524T000000Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=xgl7f47T2YcJOV9kLnkegpQHC3IfdlU3HMZZV/no`;
        const userImage = "https://mys3-fbaaf7c7-cf4c-f494-cbf0-48a430711e78.s3.us-west-2.amazonaws.com/user/0/defaultProfile.png"
            // call authentication service to sign up
        const NewUserRequest = {
            "email": email,
            "password": password,
            "firstname": firstName,
            "lastname": lastName,
            "profileImageURL": userImage
        };
        fetch('http://localhost:9000/authentication/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(NewUserRequest),
        })
            .then((TokenResponse) => TokenResponse.json())
            .then(data => {
                if (data.status === "success") {
                    dispatch(getUserByEmail(email));
                    const token = data.token;
                    localStorage.setItem('token', token);
                    dispatch(signUpSuccess(token));
                } else {
                    const error = data.message;
                    dispatch(signUpFailure(error));
                }
            })
            .catch((error) => {
                dispatch(signUpFailure(error));
        });
    }
}

export const emailVerify = (currentUser, code) => {
    return (dispatch) => {
        alert('Email validation submitted');
        dispatch(verifyEmailRequest())
        // const currentUser = useSelector((state) => state.user.currentUser);
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/authentication/validation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ "validationToken" : code }), // Send the username in the request body
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "success") {
                    dispatch(getUserByEmail(currentUser.email));
                    localStorage.setItem('token', data.token);
                    dispatch(verifyEmailSuccess());
                } else {
                    const error = data.message;
                    dispatch(verifyEmailFailure(error));
                }
            })
            .catch((error) => {
                dispatch(verifyEmailFailure(error));
            });
    }
}

export const resendEmailCode = (email) => {
    return (dispatch) => {
        alert('If you are unverified, Email validation code will be sent to your email');
        dispatch(verifyEmailRequest())
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/authentication/resend`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ "newEmail" : email }),
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "success") {
                    dispatch(verifyEmailSuccess());
                } else {
                    const error = data.message;
                    dispatch(verifyEmailFailure(error));
                }
            })
            .catch((error) => {
                dispatch(verifyEmailFailure(error));
            });
    }
}

export const changeEmail = (email) => {
    return (dispatch) => {
        alert('Request submitted, if email is valid, you will receive a verification code in your new email');
        const token = localStorage.getItem('token');
        fetch(`http://localhost:9000/authentication/email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ "newEmail" : email }),
            }).then((response) => response.json())
            .then(data => {
                if (data.status === "success") {
                    localStorage.setItem('token', data.token);
                    dispatch(getUserByEmail(email));
                    dispatch(changeEmailSuccess());
                }
            }).catch((error) => {
                console.log(error);
            });
    };

}