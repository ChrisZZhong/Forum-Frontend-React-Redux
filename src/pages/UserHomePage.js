// src/UserHomePage.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/apiCalls/postApiCalls'
import Post from '../components/Post';

const UserHomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    const userInfo = {
      orderBy: "createTime",
      asc: true
    }
    console.log("fetching posts")
    dispatch(fetchPosts(userInfo));

  }, []);

  return (
    <div>
      <div>
        <h2 className="h2-headline">Published Posts</h2>
        {/* Add the filter and sorting buttons here */}
      </div>
      <div>
        {posts.map((post) => (
          <Post
            author={post.author}
            date={post.date}
            title={post.title}
          />
        ))}
      </div>
      <button className="btn-primary">Create New Post</button>
    </div>
  );
};



export default UserHomePage;
