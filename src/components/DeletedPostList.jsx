import Post from "./Post";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchBannedOrDeletedPost} from "../redux/apiCalls/postApiCalls";

const DeletedPostList = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const adminDeletedPostList = useSelector((state) => state.post.adminDeletedPostList);

    useEffect(() => {
        dispatch(fetchBannedOrDeletedPost('deleted', 'false', 'replies', currentUser.userId));
    }, [adminDeletedPostList?.length]);

    console.log(adminDeletedPostList);
    function findAuthor(userId, users) {
        for(let user of users){
            if(user.userId === userId){
                console.log(user);
                return user.firstName + " " + user.lastName;
            }
        }
        return "unknown";
    }

    return(
        <div className="frame">
            <div className="h2-headline">Deleted Post List</div>
            <div className="map-container">
            {adminDeletedPostList?.posts?.map((post) => (
                <Post
                    key={post.postId}
                    type={"deletedPost"}
                    author={findAuthor(post.userId, adminDeletedPostList?.users)}
                    date={new Date(post.date).toLocaleString()}
                    title={post.title}
                    postId={post.postId}
                    status={'deleted'}
                />
            ))}
            </div>
    </div>);
}
export default DeletedPostList;