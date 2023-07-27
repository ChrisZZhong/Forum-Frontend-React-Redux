import Post from "./Post";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchBannedOrDeletedPost} from "../redux/apiCalls/postApiCalls";

const BannedPostList = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const adminBannedPostList = useSelector((state) => state.post.adminBannedPostList);

    useEffect(() => {
        dispatch(fetchBannedOrDeletedPost('banned', 'false', 'replies', currentUser.userId));
    }, [adminBannedPostList?.length]);

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
            <div className="h2-headline">Banned Post List</div>
            <div className="map-container">
                {adminBannedPostList?.posts?.map((post) => (
                    <Post
                        key={post.postId}
                        type={"bannedPost"}
                        author={findAuthor(post.userId, adminBannedPostList?.users)}
                        date={new Date(post.date).toLocaleString()}
                        title={post.title}
                        postId={post.postId}
                        status={'banned'}
                    />
                ))}
            </div>
    </div>);
}
export default BannedPostList;