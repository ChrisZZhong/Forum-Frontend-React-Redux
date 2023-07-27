// Post.js
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTopRepliesPosts} from "../redux/apiCalls/postApiCalls";
import Post from "./Post";

const TopRepliesPost = () => {
    const dispatch = useDispatch();
    const topRepliesPosts = useSelector(state => state?.post?.topRepliesPosts);
    useEffect(()=>{
        dispatch(fetchTopRepliesPosts())
    }, [])

    console.log(topRepliesPosts);
    return (
        <div className="frame">
            <h2 className="h2-headline">Top Replies post</h2>
            <div className="map-container">
            {topRepliesPosts?.map((top) => (
                <Post
                    key={top.postId}
                    type={"topReplies"}
                    title={top.title}
                    author={top.userId}
                    postId={top.postId}
                    date={new Date(top.date).toLocaleString()}
                />
            ))}
            </div>
        </div>
    );
};

export default TopRepliesPost;
