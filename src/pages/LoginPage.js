// LoginPage.js

import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../redux/apiCalls/AuthenticationApiCalls';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.user.currentUser);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(username, password));
  };
  useEffect(() => {
    console.log(username.length === 0 && password.length === 0);
    if (user && Object.keys(user).length !== 0) {
      navigate('/home');
    }
  }, [user, navigate]);

  // // route to home page after login success
  // useSelector((state) => {

  // });

  return (
      <div className="page-frame">
      <div className="frame">
      <h2 className="h1-headline">Login</h2>
      <form className="flex flex-col justify-center items-center p-4 m-4" onSubmit={handleLogin}>
        <input
          className="input-secondary"
          type="email"
          placeholder="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-secondary"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
            className="btn-primary mt-8"
            type="submit" disabled={username.length === 0 || password.length === 0}>
          {loading ? 'loading...' : 'login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  </div>);
};

export default LoginPage;
