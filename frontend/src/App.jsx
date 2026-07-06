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
import EditQuestion from './pages/EditQuestion';
import AddTopic from './pages/AddTopic';
import EditTopic from './pages/EditTopic';

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
          <Route path="/questions/:id/edit" element={<EditQuestion />} />
          <Route path="/topics/new" element={<AddTopic />} />
          <Route path="/topics/:id/edit" element={<EditTopic />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
