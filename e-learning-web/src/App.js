import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CourseExplorer from './pages/CourseExplorer/CourseExplorer';
import EnrollDetail from './pages/EnrollDetail/EnrollDetail';
import CourseLearningPage from './pages/Learning/CourseLearningPage';
import HomePage from './pages/Home/HomePage';
import CourseDetail from './pages/CourseDetail/coursedetail';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import AuthModal from './components/auth/AuthModal';
import CourseTable from './pages/Admin/CourseTable';
import CourseForm from './pages/Instructor/CourseForm';
import CategoryManagement from './pages/Admin/CategoryManagement';
import MyCourses from './pages/MyCourses/MyCourses';
import ProfileSettings from './pages/Profile/ProfileSettings';
import LessonListEditor from './components/course/LessonListEditor';
import InstructorCourseManager from './pages/Instructor/InstructorCourseManager';
import { useAuth } from './context/AuthContext';
import './App.css';


function App() {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  const isTeacher = isLoggedIn && (user?.role === 'instructor' || user?.role === 'teacher');
  const canAccessLessonEditor = isTeacher || (isLoggedIn && user?.role === 'admin');
  const isLearningPage = location.pathname.startsWith('/learning/');

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="App flex flex-col min-h-screen">
      {!isLearningPage && <Header />}
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
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
          <Route path="/enroll-detail/:courseId" element={<EnrollDetail />} />
          <Route path="/learning/:courseId" element={<CourseLearningPage />} />
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
