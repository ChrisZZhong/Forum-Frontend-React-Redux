import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getImageWithPath} from "../s3/s3config";
import {changeEmail, resendEmailCode} from "../redux/apiCalls/AuthenticationApiCalls";
import {updateUserProfileImage} from "../redux/apiCalls/fileApiCalls";

const EditUserProfilePage = () => {
    const user = useSelector((state) => state.user.currentUser);
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [image, setImage] = useState(null);
    const loading = useSelector((state) => state.email.loading);
    const error = useSelector((state) => state.email.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // form data
    // const [profileImage = useState(null);
    const [CEmail, setChangeEmail] = useState('');
    // const [profileImage, setProfileImage] = useState(null);

    // TODO : fix this, not update when user change
    useEffect(() => {
        // setUser(JSON.parse(localStorage.getItem('currentUser')));
        getImageWithPath(user.profileImageURL).then((url) => setImage(url));
    }, [user, navigate]);

    const jumpToVerify = (e) => {
        e.preventDefault();
        navigate('/users/verify');
    }

    const resendEmail = (e) => {
        e.preventDefault();
        dispatch(resendEmailCode(user.email));
    }

    const handleChangeEmail = (e) => {
        e.preventDefault();
        dispatch(changeEmail(CEmail));
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const profileImage = e.target.files[0];
        console.log(profileImage);
        dispatch(updateUserProfileImage(user.userId, profileImage));
    }

    const [password, setPassWord] = useState("*********")
    let i = 1;
    function togglePassword() {
        if(password==="*********"){
            setPassWord(user.password)
        }else{
            setPassWord("*********")
        }
    }

    return (
        <div className="page-frame">
        <div className="frame">
            <h2 className="h2-headline" >Profile</h2>
            <div className="w-full flex flex-row">
                <div className="w-2/3">
                    <div className="item-title">First Name: {user.firstname}</div>
                    <div className="item-title">Last Name: {user.lastname}</div>
                    <div className="item-title cursor-pointer" onClick={togglePassword}>Password : {password}</div>
                    <div className="">
                        <div className="item-title" >Email: {user.email}</div>
                        <button className="btn-secondary" onClick={jumpToVerify} disabled={loading}>Verify</button>
                        <button className="btn-secondary" onClick={resendEmail} disabled={loading}>Resend</button>
                        <input
                            className="input-secondary"
                            type="email"
                            placeholder="Enter Your New Email"
                            value={CEmail}
                            onChange={(e) => setChangeEmail(e.target.value)}
                        />
                        <button className="btn-secondary" onClick={handleChangeEmail} disabled={loading}>ChangeEmail</button>
                    </div>
                    <div className="item-title">Role: {user.type} </div>
                    <div className="item-title">DateJoined : {new Date(user.dateJoined).toLocaleString()}</div>
                    {error && <p style={{ color: 'red' }}>error</p>}
                </div>
                <div>
                    <p>
                        <img src={image} style={{height : 100}}/>
                        <input
                            type="file"
                            className="btn-file"
                            // placeholder="image"
                            // value={profileImage}
                            // accept="image/gif,image/jpeg,image/jpg,image/png"
                            onChange={handleUpload}
                        />
                        {/*<button className="btn-secondary" onClick={handleUpload}>Upload</button>*/}
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};
export default EditUserProfilePage;