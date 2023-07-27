// Home.js

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NewPostWindow from "../components/NewPostWindow";
import Post from "../components/Post";
import {fetchPosts} from "../redux/apiCalls/postApiCalls";
import DeletedPostList from "../components/DeletedPostList";
import BannedPostList from "../components/BannedPostList";
import {Link} from "react-router-dom";



const HomePage = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const adminBannedPostList = useSelector((state) => state.post.adminBannedPostList);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const isAdmin = ["admin", "super"].includes(currentUser?.type);
    const isNormalUser = ["admin", "super", "normal"].includes(currentUser?.type);

    useEffect(() => {
        const userInfo = {
            orderBy: "createTime",
            asc: false
        }
        dispatch(fetchPosts(userInfo));
    }, [posts?.length]);

    const [showWindow, setShowWindow] = useState(false);
    function toggleCreateWindow(){
        setShowWindow(!showWindow);
    }
      return (
        <div className="page-frame">
            <div className="frame">
          <h2 className="h1-headline">Home</h2>
            <div className="frame">
                {currentUser ? <p>Welcome, {currentUser.firstname}! {currentUser?.isAdmin ? <span>(admin)</span> : <></>}</p> : <Link className="btn-primary" to={"/login"}>Login Now!</Link>}
                {isNormalUser && <button className="btn-primary" onClick={toggleCreateWindow}>create a new post</button>}
                {showWindow && <NewPostWindow toggleCreateWindow={toggleCreateWindow}/>}
            </div>
                {currentUser &&<div className="frame">
                 <div className="map-container">
                    {posts?.map((post) => (
                        <Post
                            key={post.postId}
                            type={"publishedPost"}
                            author={post.author}
                            date={new Date(post.date).toLocaleString()}
                            title={post.title}
                            postId={post.postId}
                            status={"published"}
                        />
                    ))}

                </div>

            </div>}
            {isAdmin &&  <div className="frame"> <BannedPostList/></div>}
            {isAdmin && <div className="frame"> <DeletedPostList/></div>}
        </div>
    </div>);
};

export default HomePage;
