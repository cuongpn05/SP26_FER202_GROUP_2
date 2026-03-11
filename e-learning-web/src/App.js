import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CourseExplorer from './components/CourseExplorer';
import CourseDetail from './components/CourseDetail';
import CourseLearningPage from './components/CourseLearningPage';
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
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  const isTeacher = isLoggedIn && (user?.role === 'instructor' || user?.role === 'teacher');
  const canAccessLessonEditor = isTeacher || (isLoggedIn && user?.role === 'admin');
  const isLearningPage = location.pathname.startsWith('/learning/');
  
  const [showAddForm, setShowAddForm] = useState(false);

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
                <CourseExplorer />
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
