// Post.js
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeNotification} from "../redux/actions/notificationAction";

const ViewHistoryPost = () => {
    const currentUser = useSelector((state) => state.user?.currentUser);
    const notification = useSelector((state) => state.notification);

    const dispatch = useDispatch();
    function handleCloseModal() {
        dispatch(closeNotification());
        console.log(notification)
    }

    return (
        <>{
            notification && notification?.open &&
            <div className="absolute left-1/3 top-1/3 border-black border-2 w-1/3 z-50">
                <div className={notification.type}>
                    {notification.text}
                    <button className="btn-secondary" onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        }
        </>
    );
};

export default ViewHistoryPost;
