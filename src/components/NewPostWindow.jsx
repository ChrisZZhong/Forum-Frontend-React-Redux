import React, {useState} from "react";
import {updatePostAttachment, updateUserProfileImage} from "../redux/apiCalls/fileApiCalls";
import {openNotification} from "../redux/actions/notificationAction";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const NewPostWindow = ({toggleCreateWindow})=> {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [postStatus, setPostStatus] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImagesChange = (e) => {
        // Get the selected images from the input and update the state
        const selectedImages = e.target.files[0];
        console.log(selectedImages);
        setImages(selectedImages);
    };

    const handleAttachmentChange = (e) => {
        // Get the selected attachment from the input and update the state
        const selectedAttachments = e.target.files[0];
        console.log(selectedAttachments);
        setAttachments(selectedAttachments);
    };

    async function handleSubmitNewPost(e) {
        e.preventDefault();
        const newPost = {
            title: title,
            content: content,
            status: "unpublished",
        }
        if(!title){
            dispatch(openNotification({type:'modal-deleted', text:'Post Title cannot be empty!'}));
            return;
        }
        //创建新帖子流程：
        try{
            //1. 先上传new Post到mongoDB,并获得new post id
            const postId = await fetchCreateNewPost(newPost);
            //2. 再将newPost的附件传至s3bucket,并获得返回的url list
            const imageList = await fetchCreateNewImagesAndAttachments(postId, images);
            setImages(imageList);
            const attachmentList = await fetchCreateNewImagesAndAttachments(postId, attachments);
            setImages(attachmentList);
            //3. 最后根据post id将url list更新至mongoDB的new Post中
            fetchUpdatePostURLWithPostId(postId, imageList, attachmentList);
            setTitle("");
            setContent("");
            setImages([]);
            setAttachments([]);
            toggleCreateWindow();
            navigate(`/users/${currentUser.userId}/profile`);
            dispatch(openNotification({type:'modal-success', text:'Post Created Successfully!'}));
        }catch (error){
            console.log(error);
        }

        function fetchCreateNewPost(newPost) {
            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('token');
                fetch("http://localhost:9000/post/", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newPost),
                }).then((response) => response.json())
                    .then((data) => {
                        if(!data?.status?.success){
                            console.log("create post not success");
                            reject("create post not success");
                        }else{
                            console.log("create post success");
                            console.log(data);
                            console.log(data?.post?.id);
                            resolve(data?.post?.id);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching post detail:", error);
                        reject(error);
                    });
            })
        }

        async function fetchCreateNewImagesAndAttachments(newPostId, file) {
            const postId = newPostId;
            if(!file) return;
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);
            try{
                const repsonse = await fetch(`http://localhost:9000/file/posts/${postId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
                if (!repsonse.ok) {
                    throw new Error('Network response is not ok');
                }
                const data = await repsonse.json();
                console.log(data);
                console.log(data?.urlList[0]);
                return data?.urlList[0];
            }catch(error){
                console.error('Error updating user profile image:', error);
                throw error;
            }
        }

        function fetchUpdatePostURLWithPostId(newPostId, fileList, attachmentList) {
            let fileArray = [];
            if(fileList)fileArray.push(fileList);
            let attachmentArray = [];
            if(attachmentList)attachmentArray.push(attachmentList);
            const newPost = {
                title: title,
                content: content,
                postId: newPostId,
                images: fileArray,
                attachments: attachmentArray
            }
            console.log(newPost);
            const token = localStorage.getItem('token');
            console.log(token);
            fetch("http://localhost:9000/post/edit", {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPost),
            }).then((response) => response.json())
                .then((data) => {
                    if(!data){
                        setPostStatus("failure");
                    }else{
                        console.log(data);
                        setPostStatus("success");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching post detail:", error);
                    setPostStatus("failure");
                });
        }
    }


    return (
        <div className="absolute bg-white border-2 border-black p-4">
            { postStatus==="success" && <div>Successfully created a post!</div>}
            { postStatus==="failure" && <div>Failed to create a post...</div>}
            <form className="frame-left" onSubmit={handleSubmitNewPost}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input className="input-secondary border-2 border-black" onChange={handleTitleChange} type="text" id="title" name="title" />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea className="input-secondary border-2 border-black" onChange={handleContentChange} id="content" name="content" rows="4" cols="50" />
                </div>
                <div>
                    <label htmlFor="images">Images:</label>
                    <input className="btn-file" onChange={handleImagesChange} type="file" id="images" name="images" accept="image/*" multiple />
                </div>
                <div>
                    <label htmlFor="attachment">Attachment:</label>
                    <input className="btn-file" onChange={handleAttachmentChange} type="file" id="attachment" name="attachment" />
                </div>
                <button className="btn-primary" type="submit">Create a new post</button>
                <button className="btn-secondary" onClick={toggleCreateWindow}>Close</button>
            </form>
        </div>
    );
}

export default NewPostWindow;