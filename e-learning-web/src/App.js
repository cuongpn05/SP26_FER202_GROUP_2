import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CourseExplorer from './components/CourseExplorer';
import CourseLearningPage from './components/CourseLearningPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CourseTable from './components/CourseTable';
import ProfileSettings from './components/ProfileSettings';
import { useAuth } from './context/AuthContext';
import './App.css';


function App() {
  const { isLoggedIn, user } = useAuth();
  const isTeacher = isLoggedIn && (user?.role === 'instructor' || user?.role === 'teacher');

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={isTeacher ? <CourseTable /> : <CourseExplorer />} 
          />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <ProfileSettings /> : <Navigate to="/" />} 
          />
          <Route path="/course/:id" element={<CourseLearningPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
      <AuthModal />
    </div>

  );
}

export default App;
