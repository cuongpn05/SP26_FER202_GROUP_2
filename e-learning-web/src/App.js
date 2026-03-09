import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseExplorer from './components/CourseExplorer';
import CourseLearningPage from './components/CourseLearningPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <CourseExplorer />
              </main>
              <Footer />
            </>
          } />
          <Route path="/learning/:courseId" element={<CourseLearningPage />} />
        </Routes>
        <AuthModal />
      </div>
    </Router>
  );
}

export default App;
