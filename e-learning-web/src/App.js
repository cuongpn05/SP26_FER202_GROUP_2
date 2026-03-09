import CourseExplorer from './components/CourseExplorer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CourseTable from './components/CourseTable';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { isLoggedIn, user } = useAuth();
  const isTeacher = isLoggedIn && (user?.role === 'instructor' || user?.role === 'teacher');

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {isTeacher ? <CourseTable /> : <CourseExplorer />}
      </main>
      <Footer />
      <AuthModal />
    </div>

  );
}

export default App;
