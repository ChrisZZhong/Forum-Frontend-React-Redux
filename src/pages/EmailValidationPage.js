import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {emailVerify} from "../redux/apiCalls/AuthenticationApiCalls";

const EmailValidationPage = () => {
    const [code, serCode] = useState('');
    const error = useSelector((state) => state.email.error);
    const loading = useSelector((state) => state.email.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (user.type !== 'unverified') {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        dispatch(emailVerify(user, code));
    };

    // useEffect(() => {
    //     if (emailVerifySuccess) {
    //         // dispatch(verifyEmailInit());
    //         navigate('/users/profile');
    //     }
    // }, [emailVerifySuccess]);

    return (
        <div>
            <h2 className="h2-headline">Email Validation</h2>
            <p>Enter the code you received in your email</p>
            <form onSubmit={handleVerify}>
                <label>
                    Code:
                    <input
                        type="text"
                        placeholder="code"
                        value={code}
                        onChange={(e) => serCode(e.target.value)}
                    />
                </label>
                <button className="btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Verify...' : 'Verify'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );

}
export default EmailValidationPage;