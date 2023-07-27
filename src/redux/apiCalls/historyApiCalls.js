import {fetchHistoryPostsFailure, fetchHistoryPostsRequest, fetchHistoryPostsSuccess} from "../actions/historyAction";
import {fetchPostsFailure, fetchPostsSuccess} from "../actions/postAction";

export const fetchHistoryPosts = (userInfo) => {
    return (dispatch) => {
        dispatch(fetchHistoryPostsRequest());
        fetch('http://localhost:9000/postManagement/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    "Bearer " +  localStorage.getItem('token')
            },
            body: JSON.stringify(userInfo)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                let posts = data.posts;
                let map = new Map();
                let users = data.users;
                for (let user of users){
                    map.set(user.userId, user.firstName + " " + user.lastName);
                }
                const handleGetValueByKey = (key) => {
                    // 使用 get 方法根据键获取值
                    const value = map.get(key);
                    console.log(`Key: ${key}, Value: ${value}`);
                    return value;
                };
                let res = [];
                for (let post of posts){
                    let temp = {
                        date: post.date,
                        title: post.title,
                        postId: post.postId,
                        author: handleGetValueByKey(post.userId)
                    }
                    res.push(temp);
                }
                dispatch(fetchHistoryPostsSuccess(res));
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchHistoryPostsFailure(error));
            });
    };
};