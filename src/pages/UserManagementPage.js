import React, {useEffect} from 'react';
import UserList from "../components/UserList";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const UserPage = () => {
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.type !== 'admin' && user.type !== 'super') {
      navigate('/home');
    }
  }, [user, navigate]);

    return (
        <div className="page-frame">
            <h1 className="h1-headline">User Management</h1>
            <UserList />
        </div>
    );
};

export default UserPage;
