// src/redux/postsActions.js
import {
    fetchBannedOrDeletedPostFailure,
    fetchBannedOrDeletedPostRequest,
    fetchBannedOrDeletedPostSuccess,
    fetchBannedPostFailure,
    fetchBannedPostRequest, fetchBannedPostSuccess, fetchDeletedPostFailure,
    fetchDeletedPostRequest, fetchDeletedPostSuccess,
    fetchPostsFailure,
    fetchPostsRequest,
    fetchPostsSuccess,
    fetchTopPostsFailure,
    fetchTopPostsRequest,
    fetchTopPostsSuccess, fetchUnpublishedPostFailure, fetchUnpublishedPostRequest, fetchUnpublishedPostSuccess,
    updatePostStatusFailure,
    updatePostStatusRequest,
    updatePostStatusSuccess
} from "../actions/postAction";
import {openNotification} from "../actions/notificationAction";

export const fetchPosts = (userInfo) => {
  return (dispatch) => {
    console.log(userInfo);
    dispatch(fetchPostsRequest());
    fetch('http://localhost:9000/postManagement/previews/published', {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json",
                Authorization:
                  "Bearer " +  localStorage.getItem('token')// add this line
            }),
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
        dispatch(fetchPostsSuccess(res));
      })
      .catch((error) => {
        console.log(error)
        dispatch(fetchPostsFailure(error));
      });
  };
};

export const fetchTopRepliesPosts = (userInfo) => {
    return (dispatch) => {
        console.log(userInfo);
        dispatch(fetchTopPostsRequest());
        fetch('http://localhost:9000/post/top?limit=3', {
            method: 'GET',
            headers: new Headers({
                Authorization:
                    "Bearer " +  localStorage.getItem('token')// add this line
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data?.status?.success){
                    const topRepliesPosts = data?.posts
                    dispatch(fetchTopPostsSuccess(topRepliesPosts));
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchTopPostsFailure(error));
            });
    };
};

export const fetchUnpublishedPosts = (status, asc, order, userId) => {
    return (dispatch) => {
        console.log("in fetchUnpublishedPosts");
        dispatch(fetchUnpublishedPostRequest());
        fetch(`http://localhost:9000/postManagement/previews/user?asc=${asc}&orderBy=${order}&userId=${userId}`, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json",
                Authorization:
                    "Bearer " +  localStorage.getItem('token')// add this line
            }),
            body: JSON.stringify({
                status: status,
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if(data?.status?.success){
                    const posts = data?.posts;
                    const user = data?.users;
                    console.log(posts)
                    console.log(user)
                    dispatch(fetchUnpublishedPostSuccess({posts, user}));
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch(fetchUnpublishedPostFailure(error));
            });
    };
};

export const updatePostStatus = (status, newStatus, postId, userId) => {
    return (dispatch) => {
        dispatch(updatePostStatusRequest());
        const body = {
            postId: postId,
            status: newStatus,
        }
        console.log(body);
        fetch('http://localhost:9000/post/update/status', {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization:
                    "Bearer " +  localStorage.getItem('token')// add this line
            }),
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data?.success){
                    dispatch(updatePostStatusSuccess());
                    dispatch(fetchPosts({orderBy: "createTime",
                        asc: true}));
                    dispatch(fetchBannedOrDeletedPost('banned', 'false', 'replies', userId));
                    dispatch(fetchBannedOrDeletedPost('deleted', 'false', 'replies', userId));
                }
            })
            .catch((error) => {
                console.log(error)
                dispatch(updatePostStatusFailure(error));
            });
    };
};

export const fetchBannedOrDeletedPost = (status, asc, order, userId) => {
    return (dispatch) => {
        if(status==='banned'){
            dispatch(fetchBannedPostRequest());
        }else if(status==='deleted'){
            dispatch(fetchDeletedPostRequest());
        }
        fetch(`http://localhost:9000/postManagement/previews/admin?asc=${asc}&orderBy=${order}&userId=${userId}`, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json",
                Authorization:
                    "Bearer " +  localStorage.getItem('token')// add this line
            }),
            body: JSON.stringify({
                status: status,
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data?.status?.success){
                    const posts = data?.posts;
                    const users = data?.users;
                    const payload = {posts, users};
                    if(status==='banned'){
                        console.log(payload)
                        dispatch(fetchBannedPostSuccess(payload));
                    }else if(status==='deleted'){
                        console.log(payload)
                        dispatch(fetchDeletedPostSuccess(payload));
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                if(status==='banned'){
                    dispatch(fetchBannedPostFailure(error));
                }else if(status==='deleted'){
                    dispatch(fetchDeletedPostFailure(error));
                }
            });
    };
};

