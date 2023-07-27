import React, {useEffect} from 'react';
import MessageList from '../components/MessageList';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const MessageManagementPage = () => {
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.type !== 'admin' && user.type !== 'super') {
      navigate('/home');
    }
  }, [user, navigate]);
    return (
            <div className="page-frame">
                <h1 className="h1-headline">Message Management</h1>
                <MessageList />
            </div>
    );
};

export default MessageManagementPage;