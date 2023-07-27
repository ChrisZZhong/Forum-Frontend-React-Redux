import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signUp} from "../redux/apiCalls/AuthenticationApiCalls";
import {getUserByEmail} from "../redux/apiCalls/userApiCalls";


const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const user = useSelector((state) => state.user.currentUser);

    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(signUp(username, password, firstName, lastName));
    };

    useEffect(() => {
        if (user) {
            navigate('/users/'+ user.userId +'/profile');
        }
    }, [user, navigate]);

    return (
        <div className="page-frame">
            <div className="frame">
            <h1 className="h1-headline">Register</h1>
            <form className="flex flex-col justify-center items-center p-4" onSubmit={handleLogin}>
                <input className="input-secondary"
                    type="email"
                    placeholder="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input className="input-secondary"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="input-secondary"
                    type="text"
                    placeholder="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input className="input-secondary"
                    type="text"
                    placeholder="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                {/*<input*/}
                {/*    type="file"*/}
                {/*    placeholder="userImage"*/}
                {/*    value={userImage}*/}
                {/*    onChange={(e) => setUserImage(e.target.value)}*/}
                {/*/>*/}
                <button className="btn-primary" type="submit" disabled={username.length===0 || password.length===0}>
                    {loading ? 'loading...' : 'signup'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    </div>);
};
export default SignUpPage;