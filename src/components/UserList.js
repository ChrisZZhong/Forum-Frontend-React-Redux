import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUserStatus, promoteUser } from "../redux/apiCalls/userApiCalls";

const UserList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch all users when the component mounts
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleStatusChange = (username) => {
        // Check if the user to be banned is an admin or super
        const userToBeBanned = users.find(user => user.email === username);
        const isUserToBeBannedAdmin = userToBeBanned?.type === 'admin';
        const isUserToBeBannedSuper = userToBeBanned?.type === 'super';

        const isSuper = userAuthorities.includes('super');
        const isAdmin = userAuthorities.includes('admin');

        if (isSuper && (!isUserToBeBannedSuper)) {
            dispatch(updateUserStatus(username));
        } else if (isAdmin && (!isUserToBeBannedAdmin) && (!isUserToBeBannedSuper)) {
            dispatch(updateUserStatus(username));
        }
    };

    const handlePromoteUser = (username) => {
        const userToBePromoted = users.find(user => user.email === username);
        const isUserToBePromotedSuper = userToBePromoted?.type === 'super';

        if (!isUserToBePromotedSuper) {
            dispatch(promoteUser(username));
        }
    };

    const users = useSelector((state) => state.user.users);

    // Retrieve the user authority from the token stored in local storage
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userAuthorities = decodedToken.permissions.map(permission => permission.authority);
    const isSuper = userAuthorities.includes('super');

    return (
        <div className="p-1">
            <h2 className="h2-headline">User List</h2>
            <table>
                <thead>
                <tr>
                    <th>userId</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Date Joined</th>
                    <th>Type</th>
                    <th>Status</th>
                    {isSuper && <th>Promote</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.firstname} {user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.dateJoined).toLocaleString()}</td>
                        <td>{user.type}</td>
                        <td>
                            <button className="btn-primary" onClick={() => handleStatusChange(user.email)}>
                                {user.type === 'banned' ? 'Active' : 'Ban'}
                            </button>
                        </td>
                        {isSuper && (
                            <td>
                                <button className="btn-primary" onClick={() => handlePromoteUser(user.email)}>
                                    {user.type === 'admin' ? 'Demote' : 'Promote'}
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
