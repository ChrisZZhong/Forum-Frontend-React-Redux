import React from "react";

import {BrowserRouter as Router, Link, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import MessageManagementPage from "./pages/MessageManagementPage";
import PostPage from "./pages/PostPage";
import UserManagementPage from "./pages/UserManagementPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import EmailValidationPage from "./pages/EmailValidationPage";
import Navbar from "./components/Navbar";
import "./App.css";
import Modal from "./components/Modal";
import {useSelector} from "react-redux";

// Router via JSX
// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route element={<AppLayout />}>
//             <Route element={<GuardRoute />}>
//                 <Route path="profile/:id" element={<ProfilePage />} />
//             </Route>
//             <Route path="*" element={<HomePage />} />
//         </Route>
//     )
// );
const PrivateRoute = ({ element, allowedRoles }) => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    return <Navigate to="/home" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser)) {
    return <Navigate to="/home" />;
  }

  return element;
};

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <Router>
        <div className="flex flex-col">
          <div className="flex p-10 flex-row items-center justify-between">
              <Link className="text-6xl font-extrabold cursor-pointer" to="/home">Forum</Link>
              <Navbar />

          </div>
            <Modal />
          <Routes>
            <Route exact path="/login" element={<LoginPage/>} />
            <Route exact path="/register" element={<SignUpPage />} />
            <Route exact path="/users/:id/profile" element={<UserProfilePage />} />

            {/* <Route path="/users/:id/homePage" element={<UserHomePage />} /> */}

            <Route exact path="/users/profile" element={<EditUserProfilePage />} />
            <Route exact path="/users/verify" element={<EmailValidationPage />} />

            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/contactus" element={<FormPage />} />
            <Route exact path="/messages" element={<MessageManagementPage />} />
            <Route exact path="/users" element={<UserManagementPage />} />
            <Route exact path="/posts/:postId" element={<PostPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;

