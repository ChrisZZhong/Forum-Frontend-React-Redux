import {fetchImageSuccess} from "../actions/userAction";
import {getUserByEmail, updateUserImageURL} from "./userApiCalls";
import {useSelector} from "react-redux";

export const getDefaultProfile = () => {
    console.log('hi getDefaultProfile')
    const token = localStorage.getItem('token');
    return (dispatch) => {
        fetch('http://localhost:9000/file/default', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response is not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.status);
                if(!data.urlList){
                    console.log(data.urlList);
                }
                dispatch(fetchImageSuccess(data.urlList[0]));
            })
            .catch((error) => {
                console.error('Error fetching user default profile:', error);
            });
    };
};

export const updateUserProfileImage = (userId, file) => {
    // console.log('hi updateUserProfileImage');
    alert('user image update submitted');
    const token = localStorage.getItem('token');

    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:9000/file/users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response is not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response data if needed
                // const user = useSelector((state) => state.user.currentUser);
                // const user = JSON.parse(localStorage.getItem('currentUser'));
                console.log(data);
                console.log(data.urlList[0]);
                dispatch(updateUserImageURL(userId, data.urlList[0]));

            })
            .catch((error) => {
                console.error('Error updating user profile image:', error);
            });
    };
};

export const updatePostAttachment = (postId, file) => {
    console.log('hi updatePostAttachment');
    const token = localStorage.getItem('token');

    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:9000/file/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response is not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response data if needed
                console.log(data);
            })
            .catch((error) => {
                console.error('Error updating user profile image:', error);
            });
    };
};
