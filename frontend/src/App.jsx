import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import LearningLibrary from './pages/LearningLibrary';
import TopicDetail from './pages/TopicDetail';
import MyQuestions from './pages/MyQuestions';
import AddQuestion from './pages/AddQuestion';

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/topics" element={<LearningLibrary />} />
          <Route path="/topics/:id" element={<TopicDetail />} />
          <Route path="/questions" element={<MyQuestions />} />
          <Route path="/questions/new" element={<AddQuestion />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
