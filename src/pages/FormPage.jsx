// FormPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitMessageForm } from "../redux/actions/messageAction";
import {openNotification} from "../redux/actions/notificationAction";
const MessagePage = () => {
    // 从state中抽取和本component相关的部分
    const stateStatus = useSelector((state) => state.message.message);
    const user = useSelector((state) => state.user.currentUser);
    console.log(stateStatus);
    console.log(user);

    //useDispatch()是一个发指令的助手
    const dispatch = useDispatch();
    //仅在本component内使用的state，使用useState创建并储存
    const [formData, setFormData] = useState({
        subject: "",
        email: user?.email || "",
        message: "",
    });

    const [result, setResult] = useState({
        status: "",
        message: "",
    });

    //流程2. 每当用户输入内容，文本框value改变时，调用handleChange方法，去更新本component内使用的useState的数据（见13行）
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //流程4. 每当用户点击提交按钮，调用handleSubmit方法
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({subject: "",
            email:  "",
            message: ""});
        fetchSubmission(user.userId, formData.subject, formData.email, formData.message);
        dispatch(openNotification({type:'modal-success', text:'Message Submitted Successfully!'}));
    };

    //流程5. fetchSubmission函数，使用fetch向后端发送请求。(后期可以把请求后端的方法们 统一放入一个apiCalls.js中）
    function fetchSubmission(userId, subject, email, message) {
        const token = localStorage.getItem('token');
        console.log({userId, subject, email, message, token});
        return fetch("http://localhost:9000/message", {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({ userId, email, subject, message }),
        })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then((response) => {
            if (response.ok) { //正常返回
                return response.json();// 会继续到下一个then
            }else{
                return response
                    .json()
                    .catch((error) => Promise.reject({ error }))
                    .then((err) => Promise.reject(err));
            }
        })
        .then((data) => {//成功接收后端返回的数据！
            setResult({ status: data.status, message: data.message });
            dispatch(submitMessageForm(data));
        });
    }

    return (
        <div className="page-frame">
        <div className="frame">
            <h1 className="h1-headline">Contact us</h1>
            <form
                className="flex flex-col justify-center items-center p-4 w-full"
                onSubmit={handleSubmit}
                //流程3. 使用onSubmit关键词调用自定义的handleSubmit方法
            >
                <div className="flex flex-row justify-center items-center p-4 w-1/3">
                    <label className="w-1/4">Subject:</label>
                    <input
                        className="input-secondary w-3/4"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange} //流程1. 使用onChange关键词调用自定义的handleChange方法
                        required
                    />
                </div>
                <div className="flex flex-row justify-center items-center p-4 w-1/3">
                    <label className="w-1/4">Email:</label>
                    <input
                        className="input-secondary w-3/4"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-row justify-center items-start p-4 w-1/3">
                    <label className="w-1/4">Message:</label>
                    <textarea
                        className="input-secondary h-40 resize-none w-3/4"
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>);
};

export default MessagePage;
