// Post.js
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Post from "./Post";
import {useDispatch, useSelector} from "react-redux";
import {fetchHistoryPosts} from "../redux/apiCalls/historyApiCalls";
import HistoryPost from "./HistoryPost";
import {getUserByEmail} from "../redux/apiCalls/userApiCalls";
import {verifyEmailFailure, verifyEmailSuccess} from "../redux/actions/emailActions";
import {fetchUnpublishedPosts} from "../redux/apiCalls/postApiCalls";

const ViewHistoryPost = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user?.currentUser);
    const historyViewList = useSelector((state) => state.history?.historyViewList);

    useEffect(() => {
        const userInfo = {
            orderBy: "createTime",
            asc: false
        }
        dispatch(fetchHistoryPosts(userInfo))
        console.log(historyViewList)
    }, []);

    async function getUserById(userId) {
        const response = await fetch(`http://localhost:9000/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "OK") {
                return data.user;
            } else {
                const error = data.message;
                console.log(error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
        console.log(response)
    }

    return (
        <div className="frame">
            <h2 className="h2-headline">View History</h2>
            <div className="map-container">
            {historyViewList  && historyViewList?.map((history) => (
                <Post
                    key={history.postId}
                    type={"history"}
                    author={history.author}
                    date={new Date(history.date).toLocaleString()}
                    title={history.title}
                    postId={history.postId}
                />
            ))}
            </div>
        </div>
    );
};

export default ViewHistoryPost;
