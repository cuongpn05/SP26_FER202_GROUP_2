import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CourseExplorer from './components/CourseExplorer';
import CourseLearningPage from './components/CourseLearningPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CourseTable from './components/CourseTable';
import CourseForm from './components/CourseForm';
import ProfileSettings from './components/ProfileSettings';
import { useAuth } from './context/AuthContext';
import './App.css';


function App() {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  
  const isTeacher = isLoggedIn && (user?.role === 'instructor' || user?.role === 'teacher');
  const isLearningPage = location.pathname.startsWith('/learning/');
  
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="App flex flex-col min-h-screen">
      {!isLearningPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
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
            path="/profile" 
            element={isLoggedIn ? <ProfileSettings /> : <Navigate to="/" />} 
          />
          <Route path="/learning/:courseId" element={<CourseLearningPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {!isLearningPage && <Footer />}
      <AuthModal />
    </div>

  );
}

export default App;
