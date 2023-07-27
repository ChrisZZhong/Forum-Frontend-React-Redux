import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchHistoryPosts} from "../redux/apiCalls/historyApiCalls";
import {fetchBannedOrDeletedPost, fetchUnpublishedPosts} from "../redux/apiCalls/postApiCalls";
import Post from "./Post";

const Drafts =()=>{
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const nonPublishedPosts = useSelector((state) => state.post.nonPublishedPosts);

    useEffect(() => {
        const userInfo = {
            orderBy: "createTime",
            asc: false
        }
        dispatch(fetchUnpublishedPosts('unpublished', 'false', 'replies', currentUser.userId));
    }, [nonPublishedPosts?.length]);

    return(
        <div className="frame">
            <h2 className="h2-headline">My Draft</h2>
            <div className="map-container">
            {nonPublishedPosts && nonPublishedPosts?.posts && nonPublishedPosts?.posts?.map((post) => (
                <Post
                    key={post.postId}
                    type={"draft"}
                    author={post.userId}
                    date={new Date(post.date).toLocaleString()}
                    title={post.title}
                    postId={post.postId}
                    status={'unpublished'}
                />
            ))}
            </div>
        </div>
    );
}
export default Drafts;