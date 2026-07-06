import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import QuestionCard from '../components/QuestionCard';

function MyQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(questions.filter((question) => question._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return <h2>Loading your questions...</h2>;
  }

  return (
    <div className="questions-page">
      <div className="page-header">
        <h1>My Questions</h1>

        <Link to="/questions/new" className="primary-button">
          Add Question
        </Link>
      </div>

      {questions.length === 0 ? (
        <div className="empty-state">
          <h2>No questions saved yet.</h2>
          <p>
            As you browse learning topics, save questions you want to discuss
            with your care team.
          </p>
        </div>
      ) : (
        <div className="question-list">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyQuestions;