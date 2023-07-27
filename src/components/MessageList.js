import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages, updateMessageStatus } from "../redux/apiCalls/messageApiCalls";

const MessageList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessages());
    }, []);

    const handleStatusChange = (messageId, status) => {
        // Toggle the status between "Open" and "Close" and update the message status
        const newStatus = status === 'Open' ? 'Close' : 'Open';
        dispatch(updateMessageStatus(messageId, newStatus));
    };

    const messages = useSelector(state => state.message.messages);

    return (
        <div className="p-1">
            <h2 className="h2-headline">Message List</h2>
            <table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {messages?.map((message) => (
                    <tr key={message.messageId}>
                        <td>{message.email}</td>
                        <td>{message.subject}</td>
                        <td>{message.message}</td>
                        <td>{message.date}</td>
                        <td>
                            <button className="btn-primary" onClick={() => handleStatusChange(message.messageId, message.status)}>
                                {message.status === 'Open' ? 'Open' : 'Close'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MessageList;
