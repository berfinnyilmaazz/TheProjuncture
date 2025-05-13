import Body from "./pages/Body";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";
import PublishProject from "./pages/PublishProject";
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom'; // ❌ BrowserRouter kaldırıldı
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import React from "react";
import Task from "./pages/Task";
import TaskDetails from "./pages/TaskDetails";
import UserProfile from "./pages/UserProfile";
import ProjectDetail from "./pages/ProjectDetail";
import AllNotifications from "./pages/AllNotifications";
import SearchResults from "./pages/SearchResults";


function Layout () {
  const { user } =useSelector((state) => state.auth) || {};
  const location = useLocation();

  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='flex-1 overflow-y-auto'>
        <Navbar />

      
        <div className='p-4 2x1:px-10'>
          <Outlet />
        </div>

        
          <Footer />
        </div>

    </div>
    
  )
}

export default function App() {

  const { user } = useSelector((state) => state.auth) || {};

  return (
    <>
      <Routes>
        {/* Login sayfası */}
        <Route path="/log-in" element={<Login />} />
        
        {/* Eğer kullanıcı giriş yapmamışsa Body sayfası */}
        <Route element={<Layout />}>
          <Route index path="/" element={<Body />} />
        </Route>

        {/* Kullanıcı giriş yaptıysa diğer sayfalar */}
        {user && (
          <Route element={<Layout />}>
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/publish-project" element={<PublishProject />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/project/:projectId/tasks" element={<Task />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/notifications" element={<AllNotifications />} />
            <Route path="/search" element={<SearchResults />} />
          </Route>
        )}
      </Routes>
    </>
  );
}
