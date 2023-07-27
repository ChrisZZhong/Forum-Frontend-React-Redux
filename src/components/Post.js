// Post.js
import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchBannedOrDeletedPost, fetchPosts, updatePostStatus} from "../redux/apiCalls/postApiCalls";
import {openNotification} from "../redux/actions/notificationAction";

const Post = ({ type, author, date, title, postId, status, userId, user }) => {
    const currentUser = useSelector((state) => state.user?.currentUser);
    const posts = useSelector((state) => state.post.posts);

    const isAdmin = ["admin", "super"].includes(currentUser?.type);
    const operation = ["bannedPost", "deletedPost", "publishedPost"].includes(type);
    const showAuthor = !["topReplies","draft"].includes(type);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //for admin only
    function changePostStatus(){
        let newStatus='published';
        if(status==='published'){
            newStatus= 'banned';
        }
        dispatch(updatePostStatus(status, newStatus, postId, currentUser.userId));
        //2. re-render the page of admin home page
        console.log('re-rendering')
        dispatch(openNotification({type:'modal-success', text:'Post Operation Succeeded!'}));
        //navigate(`/users/${currentUser.userId}/profile`)

        window.scrollTo(0, 0);
        console.log(posts);
    }
    return (
        type==="history"?
            (
            <div className="border-black border-2 m-0.5 w-2/5 min-w-fit">
                <Link to={`/posts/${postId}`} className="group hover:bg-gray-400 w-2/3 group-hover:text-gray-400">
                    <div className="pl-4 pb-2 m-0.5 group-hover:text-gray-400">
                        <h3 className="text-2xl font-bold py-1">{title}</h3>
                        <p className="h4-subtext group-hover:text-gray-400">Viewed on {date}</p>
                    </div>
                </Link>
            </div>
            ):(
            <div className="border-black border-2 m-0.5 w-2/5 min-w-fit ">
                <Link to={`/posts/${postId}`} className="group hover:bg-gray-400 w-2/3 group-hover:text-gray-400">
                    <div className="pl-4 pb-2 m-0.5 group-hover:text-gray-400">
                        <h3 className="text-2xl font-bold py-1">{title}</h3>
                        {showAuthor && <p className="h4-subtext group-hover:text-gray-400">Created By <span className="text-gray-800 group-hover:text-gray-400">{author}</span></p>}
                        <p className="h4-subtext group-hover:text-gray-400">{date}</p>
                    </div>
                </Link>
                <div className="flex justify-center items-center p-2 w-full" >
                {operation && isAdmin && <button className={status==='published'?'btn-secondary-delete':'btn-secondary-success'} onClick={changePostStatus}>{status==='published'?'ban':status==='banned'?'unban':'recover'}</button>}
            </div>
        </div>)
  );
};

export default Post;
