import CourseExplorer from './components/CourseExplorer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <CourseExplorer />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

export default App;
