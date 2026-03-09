import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CourseExplorer from './components/CourseExplorer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProfileSettings from './components/ProfileSettings';
import './App.css';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-8">
          <Routes>
            <Route path="/" element={<CourseExplorer />} />
            <Route 
              path="/profile" 
              element={isLoggedIn ? <ProfileSettings /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
        <Footer />
        <AuthModal />
      </div>
    </Router>
  );
}

export default App;
