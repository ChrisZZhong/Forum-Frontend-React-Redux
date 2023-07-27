// src/NewPostForm.js
import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {openNotification} from "../redux/actions/notificationAction";

const NewPostForm = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDraft, setIsDraft] = useState(false);

  const dispatch = useDispatch();
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleDraftToggle = () => {
    setIsDraft(!isDraft);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在这里处理发布/保存逻辑
    // 可以使用Redux来存储帖子数据或将数据发送到后端API
    console.log('Form submitted:', { author, title, content, isDraft });
    // 清空表单
    setAuthor('');
    setTitle('');
    setContent('');
    setIsDraft(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
          required
        />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={handleContentChange}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isDraft}
            onChange={handleDraftToggle}
          />
          Save as Draft
        </label>
      </div>
      <button className="btn-primary" type="submit">Publish</button>
    </form>
  );
};

export default NewPostForm;
