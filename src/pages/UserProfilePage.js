// LoginPage.js

import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUserProfile} from "../redux/apiCalls/userApiCalls";
import {useParams} from "react-router";
import {getImageWithPath} from "../s3/s3config";
import {useNavigate} from "react-router-dom";
import ViewHistoryPost from "../components/ViewHistoryPost";
import TopRepliesPost from "../components/TopRepliesPost";
import Drafts from "../components/Drafts";


const UserProfilePage = () => {
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    const user = useSelector((state) => state.user.currentUser);
    const pageUser = useSelector((state) => state.userProfile.user);
    const [image, setImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    // pageUser = {};

    useEffect(() => {
        dispatch(fetchUserProfile(id));
    }, [id, navigate]);

    useEffect(() => {
        if (Object.keys(pageUser).length !== 0) {
                // JSON.parse(localStorage.getItem('currentUser'));
            getImageWithPath(pageUser.profileImageURL).then((url) => setImage(url));
            setCurrentUser(user.userId === pageUser.userId)
        }
    }, [pageUser]);

    const jumpToEditProfile = (e) => {
        e.preventDefault();
        navigate('/users/profile');
    }

    return (
        <div className="page-frame">
            <div className="frame">
                <h2 className="h2-headline">Profile</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '20px' }}>
                        <img
                            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                            src={image}
                            alt="user profile image"
                        />
                    </div>
                    <div>
                        <div className="item-title">First Name: {pageUser.firstname}</div>
                        <div className="item-title">Last Name: {pageUser.lastname}</div>
                    </div>
                </div>
                <div className="item-title">Date Joined: {new Date(pageUser.dateJoined).toLocaleString()}</div>
                <button className="btn-primary" hidden={!currentUser} onClick={jumpToEditProfile}>Edit Profile</button>
            </div>
            <TopRepliesPost />
            <Drafts />
            <ViewHistoryPost />
        </div>
    );
};

export default UserProfilePage;
