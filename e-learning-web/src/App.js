import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CourseExplorer from './components/CourseExplorer';
import CourseDetail from './components/CourseDetail';
import CourseLearningPage from './components/CourseLearningPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CourseTable from './components/CourseTable';
import CourseForm from './components/CourseForm';
import CategoryManagement from './components/CategoryManagement';
import MyCourses from './components/MyCourses';
import ProfileSettings from './components/ProfileSettings';
import LessonListEditor from './components/LessonListEditor';
import InstructorCourseManager from './components/InstructorCourseManager';
import { useAuth } from './context/AuthContext';
import './App.css';


function App() {
  const { isLoggedIn, user, openAuthModal } = useAuth();
  const location = useLocation();

  const isTeacher = isLoggedIn && (user?.role === 'instructor' || user?.role === 'teacher');
  const canAccessLessonEditor = isTeacher || (isLoggedIn && user?.role === 'admin');
  const isLearningPage = location.pathname.startsWith('/learning/');

  const [showAddForm, setShowAddForm] = useState(false);

  // Auto-trigger login modal if user hits a protected route while logged out
  useEffect(() => {
    const protectedRoutes = ['/course-detail', '/learning', '/my-courses', '/profile', '/lesson-editor', '/instructor', '/admin'];
    const isProtected = protectedRoutes.some(route => location.pathname.startsWith(route));

    if (isProtected && !isLoggedIn) {
      openAuthModal('login');
    }
  }, [location.pathname, isLoggedIn, openAuthModal]);

  return (
    <div className="App flex flex-col min-h-screen">
      {!isLearningPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/explore" element={<CourseExplorer />} />
          <Route
            path="/"
            element={
              isTeacher ? (
                showAddForm ? (
                  <CourseForm
                    onSuccess={() => setShowAddForm(false)}
                    onCancel={() => setShowAddForm(false)}
                  />
                ) : (
                  <CourseTable onAddNew={() => setShowAddForm(true)} />
                )
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/my-courses"
            element={isLoggedIn ? <MyCourses /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfileSettings /> : <Navigate to="/" />}
          />
          <Route
            path="/course-detail/:courseId"
            element={isLoggedIn ? <CourseDetail /> : <Navigate to="/" />}
          />
          <Route
            path="/learning/:courseId/:lessonId?"
            element={isLoggedIn ? <CourseLearningPage /> : <Navigate to="/" />}
          />
          <Route
            path="/lesson-editor/:courseId"
            element={canAccessLessonEditor ? <LessonListEditor /> : <Navigate to="/" />}
          />
          <Route
            path="/instructor/courses"
            element={canAccessLessonEditor ? <InstructorCourseManager /> : <Navigate to="/" />}
          />
          <Route
            path="/lesson-editor"
            element={canAccessLessonEditor ? <LessonListEditor /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/categories"
            element={isLoggedIn && user?.role === 'admin' ? <CategoryManagement /> : <Navigate to="/" />}
          />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {!isLearningPage && <Footer />}
      <AuthModal />
    </div>

  );
}

export default App;
