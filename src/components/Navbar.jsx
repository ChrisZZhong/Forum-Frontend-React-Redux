import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getImageWithPath, getDefaultImage} from "../s3/s3config"
import {updateUserProfileImage} from "../redux/apiCalls/fileApiCalls";
import { logoutSuccess } from "../redux/actions/authenticationAction";

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log(currentUser);
    const isAdmin = ["admin","super"].includes(currentUser?.type);
    const isNormal = ["normal"].includes(currentUser?.type);
    const isUnverified = ["unverified"].includes(currentUser?.type);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Display the selected image to the user
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            console.log(imageUrl)
            const userId = currentUser?.userId;
            console.log(userId)
            if (userId===null || !file===null) return;
            // Upload the image to S3
            updateUserProfileImage(userId, file);
        }
    };


    // 加载图片
    const [image, setImage] = useState(null);
    useEffect(()=>{
        getImage();
    }, [currentUser]);
    function getImage() {
        if(currentUser){
            const filePath = currentUser.profileImageURL;
            getImageWithPath(filePath).then((url) => setImage(url));
        }else{
            setImage(null);
        }
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        dispatch(logoutSuccess());
        navigate('/home');
    }

    return (
        <nav className="flex flex-col items-center justify-center">
            <ul className="list-none flex items-center justify-center">
                <li>
                    <Link className="btn-primary" to="/home" >Home</Link>
                </li>
                <li>
                    {isNormal || isAdmin || isUnverified?
                        <Link className="btn-primary" to={`/users/${currentUser.userId}/profile`} >My Profile</Link>
                        :
                        <></>
                    }
                </li>
                <li>
                    <Link className="btn-primary" to="/contactus" >Contact us</Link>
                </li>
                <li>
                    {isAdmin ?
                        <Link className="btn-primary" to="/users"  >User Management</Link>
                            :
                        <></>
                    }
                </li>
                <li>
                    {isAdmin ?
                        <Link className="btn-primary" to="/messages" >Message Management</Link>
                        :
                        <></>
                    }
                </li>
                <li>
                    {currentUser ?
                        <a className="btn-primary" onClick={logout} >Logout</a>
                        :
                        <Link className="btn-primary" to="/register" >Register</Link>
                    }
                </li>
                <li>
                    {!currentUser &&
                        <Link className="btn-primary" to="/login" >Login</Link>
                    }
                </li>
                {image && <img onClick={()=>navigate(`/users/${currentUser.userId}/profile`)} src={image} className="cursor-pointer border-neutral-500 hover:border-2 w-8 h-8 rounded-full" alt="image" />}
            </ul>
        </nav>
    );
};

export default Navbar;
