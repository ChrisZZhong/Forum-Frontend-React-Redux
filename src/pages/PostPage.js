// Post.js

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getImageWithPath} from "../s3/s3config";
import {openNotification} from "../redux/actions/notificationAction";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const currentUser = useSelector((state) => state.user?.currentUser);
  const token = localStorage.getItem('token');

  const [post, setPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [showReplyFormIndex, setShowReplyFormIndex] = useState(null);
  const [subReplyText, setSubReplyText] = useState('');
  const [images, setImages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [userImageMap, setUserImageMap] = useState({});

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserNameById = (userId) => {
    const user = users.find((user) => user.userId === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleReplyButtonClick = (replyIndex) => {
    setShowReplyFormIndex((prevIndex) => {
      // If the clicked reply button is for the currently shown reply, hide the form
      // Otherwise, show the form for the clicked reply
      return prevIndex === replyIndex ? null : replyIndex;
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() === '') {
      // Show an alert if the title is empty
      window.alert('Title cannot be empty.');
    } else {
      editPost();
      setEditMode(false);
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;

    // Check if the input value is not empty
    if (value.trim() !== '') {
      setEditedTitle(value);
    }
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const fetchPostData = async () => {
    console.log(
      "Getting post."
    );
    fetch("http://localhost:9000/postManagement/" + postId, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        Authorization:
          "Bearer " + token
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the post data in state
        setPost(data.post);
        setUsers(data.users);

        const imageMap = {};
        const userImageUrlsPromises = [];

        for (let user of data.users) {
          userImageUrlsPromises.push(getImageWithPath(user.profileImageURL));
        }

        Promise.all(userImageUrlsPromises)
          .then((resolvedUrls) => {
            for (let i = 0; i < data.users.length; i++)
              imageMap[data.users[i].userId] = resolvedUrls[i];
            setUserImageMap(imageMap);
            console.log(imageMap);
          })
          .catch((error) => {
            // Handle errors if any of the Promises fail
            console.error("Error occurred while fetching user image URLs:", error);
            setUserImageMap({}); // Set images to an empty array in case of errors
          });

        const imageUrlsPromises = [];
        for (let imageUrl of data.post.images) {
          imageUrlsPromises.push(getImageWithPath(imageUrl));
        }

        Promise.all(imageUrlsPromises)
          .then((resolvedUrls) => {
            setImages(resolvedUrls);
          })
          .catch((error) => {
            // Handle errors if any of the Promises fail
            console.error("Error occurred while fetching image URLs:", error);
            setImages([]); // Set images to an empty array in case of errors
          });

        const attachmentUrlsPromises = [];
        for (let attachmentUrl of data.post.attachments) {
          attachmentUrlsPromises.push(getImageWithPath(attachmentUrl));
        }

        Promise.all(attachmentUrlsPromises)
          .then((resolvedUrls) => {
            setAttachments(resolvedUrls);
          })
          .catch((error) => {
            // Handle errors if any of the Promises fail
            console.error("Error occurred while fetching attachment URLs:", error);
            setAttachments([]); // Set images to an empty array in case of errors
          });
      })
      .catch((error) => {
        console.error("Error fetching post detail:", error);
        navigate('/home');
        alert("Post not available.");
      });
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    // Create the reply object
    const newReply = {
      comment: replyText,
      postId: postId
    };

    try {
      // Send the reply to the backend
      const response = await fetch('http://localhost:9000/post/reply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(newReply),
      });

      if (response.ok) {
        // Clear the reply input field on successful submission
        setReplyText('');

        // Reload the post data to fetch the updated replies (optional)
        // You can choose to update the post data with the new reply instead of reloading the entire post data
        // For simplicity, I'm reloading the post data here to show the updated replies immediately after submitting
        fetchPostData();
      } else {
        // Handle the response if the submission was not successful
        console.error('Failed to submit reply:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error submitting reply:', error);
    }
  };

  const handleSubReplySubmit = async (event) => {
    event.preventDefault();

    // Create the reply object
    const newReply = {
      comment: subReplyText,
      postId: postId,
      replyIndex: showReplyFormIndex
    };

    try {
      // Send the reply to the backend
      const response = await fetch('http://localhost:9000/post/subReply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(newReply),
      });

      if (response.ok) {
        // Clear the reply input field on successful submission
        setSubReplyText('');
        setShowReplyFormIndex(null);

        // Reload the post data to fetch the updated replies (optional)
        // You can choose to update the post data with the new reply instead of reloading the entire post data
        // For simplicity, I'm reloading the post data here to show the updated replies immediately after submitting
        fetchPostData();
      } else {
        // Handle the response if the submission was not successful
        console.error('Failed to submit reply:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error submitting reply:', error);
    }
  };

  const deleteReply = async (replyIndex) => {
    // Create the reply object
    const request = {
      postId: postId,
      replyIndex: replyIndex
    };

    try {
      // Send the reply to the backend
      const response = await fetch('http://localhost:9000/post/delete/reply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        // Reload the post data to fetch the updated replies (optional)
        // You can choose to update the post data with the new reply instead of reloading the entire post data
        // For simplicity, I'm reloading the post data here to show the updated replies immediately after submitting
        fetchPostData();
      } else {
        // Handle the response if the submission was not successful
        console.error('Failed to delete reply:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error deleting reply:', error);
    }
  };

  const deleteSubReply = async (replyIndex, subReplyIndex) => {
    // Create the reply object
    const request = {
      postId: postId,
      replyIndex: replyIndex,
      subReplyIndex: subReplyIndex
    };

    try {
      // Send the reply to the backend
      const response = await fetch('http://localhost:9000/post/delete/subreply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        // Reload the post data to fetch the updated replies (optional)
        // You can choose to update the post data with the new reply instead of reloading the entire post data
        // For simplicity, I'm reloading the post data here to show the updated replies immediately after submitting
        fetchPostData();
      } else {
        // Handle the response if the submission was not successful
        console.error('Failed to delete sub reply:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error deleting sub reply:', error);
    }
  };

  const archiveToggle = async () => {
    const request = {
      postId: postId,
      archived: !post.archived
    };

    try {
      const response = await fetch('http://localhost:9000/post/update/archived', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        fetchPostData();
      } else {
        console.error('Failed to update archived:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating archived:', error);
    }
  };

  const publishPost = async () => {
    const request = {
      postId: postId,
      status: 'published'
    };

    try {
      const response = await fetch('http://localhost:9000/post/update/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        fetchPostData();
        dispatch(openNotification({type:'modal-success', text:'Post Published Successfully!'}));
        navigate('/home');
      } else {
        console.error('Failed to update status:', response.statusText);
        dispatch(openNotification({type:'modal-failure', text:'Post Publish Failed!'}));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      dispatch(openNotification({type:'modal-failure', text:'Post Publish Failed!'}));
    }
  };

  const hidePost = async () => {
    const request = {
      postId: postId,
      status: 'hidden'
    };

    try {
      const response = await fetch('http://localhost:9000/post/update/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        fetchPostData();
        dispatch(openNotification({type:'modal-deleted', text:'Post Hide Successfully!'}));
        navigate(`/users/${currentUser.userId}/profile`);
      } else {
        console.error('Failed to update status:', response.statusText);
        dispatch(openNotification({type:'modal-failure', text:'Post Hide Failed!'}));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const banPost = async () => {
    const request = {
      postId: postId,
      status: 'banned'
    };

    try {
      const response = await fetch('http://localhost:9000/post/update/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        fetchPostData();
      } else {
        console.error('Failed to update status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deletePost = async () => {
    const request = {
      postId: postId,
      status: 'deleted'
    };

    try {
      const response = await fetch('http://localhost:9000/post/update/status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        fetchPostData();
        dispatch(openNotification({type:'modal-deleted', text:'Delete Post Successfully!'}))
        navigate(`/users/${currentUser.userId}/profile`);
      } else {
        dispatch(openNotification({type:'modal-failure', text:'Delete Post Failed!'}))
        console.error('Failed to update status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const editPost = async () => {
    const request = {
      title: editedTitle,
      content: editedContent,
      postId: postId
    };

    try {
      const response = await fetch('http://localhost:9000/post/modify', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            "Bearer " + token        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        fetchPostData();
      } else {
        console.error('Failed to edit post:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  if (!post) {
    return <div className="page-frame">Loading...</div>;
  }

  return (
    <div className="page-frame">
      {post.userId === currentUser.userId &&
      <div className="frame-row">
      {((post.status === 'published' || post.status === 'hidden') && post.userId === currentUser.userId) && currentUser.type !== 'unverified' && (
        <button className="btn-secondary" onClick={() => archiveToggle()}>{post.archived ? 'Unarchive' : 'Archive'}</button>
      )}
      {(((post.status === 'unpublished' || post.status === 'hidden') && post.userId === currentUser.userId) ||
        ((post.status === 'banned' || post.status === 'deleted') && (currentUser.type === 'admin' || currentUser.type === 'super'))) && currentUser.type !== 'unverified' && (
        <button className="btn-secondary" onClick={() => publishPost()}>Publish</button>
      )}
      {(post.status === 'published' && post.userId === currentUser.userId) && currentUser.type !== 'unverified' && (
        <button className="btn-secondary" onClick={() => hidePost()}>Hide</button>
      )}
      {((post.status === 'published' && (currentUser.type === 'admin' || currentUser.type === 'super'))) && currentUser.type !== 'unverified' && (
        <button className="btn-secondary" onClick={() => banPost()}>Ban</button>
      )}
      {(((post.status === 'published' || post.status === 'banned') && post.userId === currentUser.userId)) && currentUser.type !== 'unverified' && (
        <button className="btn-secondary-delete" onClick={() => deletePost()}>Delete</button>
      )}
      </div>
      }
      <div className="frame-left">
        {editMode ? (
          // Edit mode: show input fields to edit the title and content
          <div>
            <div>
              <label htmlFor="editedTitle">Title:</label>
              <input className="input-secondary" type="text" id="editedTitle" value={editedTitle} onChange={handleTitleChange} />
            </div>
            <div>
              <label htmlFor="editedContent">Content:</label>
              <textarea className="input-secondary" id="editedContent" value={editedContent} onChange={handleContentChange}></textarea>
            </div>
            <div>
              <button className="btn-primary" onClick={handleSaveClick}>Save</button>
              <button className="btn-primary" onClick={()=>setEditMode(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          // View mode: display the title and content
          <div >
            <h1 className="h2-headline">{post.title}</h1>
            <p className="h3-text">{post.content}</p>
            {post.userId === currentUser.userId && currentUser.type !== 'unverified' &&
              (post.status === 'published' || post.status === 'hidden' || post.status === 'unpublished') && (
              <button className="btn-primary" onClick={handleEditClick}>Edit</button>
            )}
          </div>
        )}
      </div>
      <div className="frame-left">
        <p className="h4-subtext">Posted by: {getUserNameById(post.userId)}</p>
        <div key={post.userId}>
          <img src={userImageMap[post.userId]} alt={`User ${post.userId}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
        </div>
        <p className="h4-subtext">Post Date: {new Date(post.dateCreated).toLocaleString()}</p>
        {new Date(post.dateCreated).toLocaleString() !== new Date(post.dateModified).toLocaleString() && (
            <p className="h4-subtext">Update Date: {new Date(post.dateModified).toLocaleString()}</p>
        )}
      </div>


      {images.length > 0 && (
        <div className="frame-left">
          <h2 className="h3-text">Images:</h2>
          <ul>
            {images.map((imageUrl) => (
              <p key={imageUrl}><img src={imageUrl} style={{height : 250}}/></p>
            ))}
          </ul>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="frame-left">
          <h2 className="h3-text">Attachments:</h2>
          <ul>
            {attachments.map((attachment, index) => (
              <li key={index}>
                <a className="cursor-pointer hover:text-blue-600 underline" href={attachments[index]} download>
                  Download File {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!post.archived && post.status === 'published' && currentUser.type !== 'unverified' && (
        <form className="frame-left" onSubmit={handleReplySubmit}>
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="replyText">Reply:</label>
            <textarea
              className="border border-gray-300 rounded shadow p-2 w-full"
              id="replyText"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
            ></textarea>
          </div>
          <button className="btn-primary" type="submit">Reply</button>
        </form>
      )}

      <h2 className="h2-headline">Replies:</h2>
      <ul className="frame-left">
        {post.postReplies.map((reply, replyIndex) => reply.active ? (
          <li className="frame-left border-2 border-blacks" key={replyIndex}>
            <p className="font-bold text-2xl">{reply.commentText}</p>
            <p className="h4-subtext">Posted by: {getUserNameById(reply.userId)}</p>
            <div key={reply.userId}>
              <img src={userImageMap[reply.userId]} alt={`User ${reply.userId}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
            </div>
            {reply.dateCreated && (
              <p className="h4-subtext">Reply Date: {new Date(reply.dateCreated).toLocaleString()}</p>
            )}

            {!post.archived && post.status === 'published' && currentUser.type !== 'unverified' && (
              (showReplyFormIndex === replyIndex ? (
                // Show reply form for the currently clicked reply
                <form onSubmit={handleSubReplySubmit}>
                  <div>
                    <label className="block text-gray-700 font-medium" htmlFor="subReplyText">Reply:</label>
                    <textarea
                      className="border border-gray-300 rounded shadow p-2 w-full"
                      placeholder="Enter your reply"
                      id="subReplyText"
                      value={subReplyText}
                      onChange={(e) => setSubReplyText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button className="btn-secondary" type="submit">Reply</button>
                </form>
              ) : (
                // Show reply button for other replies or when the form is hidden
                <button className="btn-secondary" onClick={() => handleReplyButtonClick(replyIndex)}>Reply</button>
              ))
            )}

            {(currentUser.type === 'admin' || currentUser.type === 'super' ||
              currentUser.userId === post.userId || currentUser.userId === reply.userId) &&
              !(post.status === 'banned' || post.status === 'deleted') && currentUser.type !== 'unverified' && (
              <button className="btn-secondary-delete" onClick={() => deleteReply(replyIndex)}>Delete</button>
            )}

            {reply.subReplies.length > 0 && (
              <ul className="ml-8">
                {reply.subReplies.map((subReply, subReplyIndex) => subReply.active ? (
                  <li key={subReplyIndex}>
                    <p className="h3-text">{subReply.commentText}</p>
                    <p className="h4-subtext">Posted by: {getUserNameById(subReply.userId)}</p>
                    <div key={subReply.userId}>
                      <img src={userImageMap[subReply.userId]} alt={`User ${subReply.userId}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                    </div>
                    {subReply.dateCreated && (
                      <p className="h4-subtext">Sub-Reply Date: {new Date(subReply.dateCreated).toLocaleString()}</p>
                    )}

                    {(currentUser.type === 'admin' || currentUser.type === 'super' ||
                      currentUser.userId === post.userId || currentUser.userId === subReply.userId) &&
                      !(post.status === 'banned' || post.status === 'deleted') && currentUser.type !== 'unverified' && (
                        <button className="btn-secondary-delete" onClick={() => deleteSubReply(replyIndex, subReplyIndex)}>Delete</button>
                    )}
                    </li>
                ) : null)}
              </ul>
            )}
          </li>
        ) : null)}
      </ul>
    </div>
  );
};

export default PostPage;
