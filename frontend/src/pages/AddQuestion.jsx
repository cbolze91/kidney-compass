import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

function AddQuestion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preselectedTopic = searchParams.get('topic');
  const token = localStorage.getItem('token');

  const [topics, setTopics] = useState([]);

  const [formData, setFormData] = useState({
    educationTopic: preselectedTopic || '',
    question: '',
    notes: '',
    status: 'Open',
  });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await api.get('/topics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTopics(response.data);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Could not load topics');
      }
    };

    fetchTopics();
  }, [token]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/questions', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/questions');
    } catch (error) {
      alert(error.response?.data?.message || 'Question could not be saved');
    }
  };

  return (
    <div className="form-page">
      <h1>Add Question</h1>

      <form onSubmit={handleSubmit}>
        <label>Topic</label>

        <select
          name="educationTopic"
          value={formData.educationTopic}
          onChange={handleChange}
          required
        >
          <option value="">Choose a topic</option>

          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>
              {topic.title}
            </option>
          ))}
        </select>

        <label>Question</label>

        <textarea
          name="question"
          placeholder="What do you want to ask your care team?"
          value={formData.question}
          onChange={handleChange}
          required
        />

        <label>Notes</label>

        <textarea
          name="notes"
          placeholder="Add any notes or context..."
          value={formData.notes}
          onChange={handleChange}
        />

        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="Answered">Answered</option>
        </select>

        <button type="submit">
          Save Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;