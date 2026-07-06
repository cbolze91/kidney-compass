import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [topics, setTopics] = useState([]);

  const [formData, setFormData] = useState({
    educationTopic: '',
    question: '',
    notes: '',
    status: 'Open',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsResponse = await api.get('/topics');

        const questionResponse = await api.get(`/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTopics(topicsResponse.data);

        setFormData({
          educationTopic: questionResponse.data.educationTopic?._id || '',
          question: questionResponse.data.question || '',
          notes: questionResponse.data.notes || '',
          status: questionResponse.data.status || 'Open',
        });
      } catch (error) {
        alert(error.response?.data?.message || 'Could not load question');
        navigate('/questions');
      }
    };

    fetchData();
  }, [id, token, navigate]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/questions/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/questions');
    } catch (error) {
      alert(error.response?.data?.message || 'Question could not be updated');
    }
  };

  return (
    <div className="form-page">
      <h1>Edit Question</h1>

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
          value={formData.question}
          onChange={handleChange}
          required
        />

        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Open">Open</option>
          <option value="Answered">Answered</option>
        </select>

        <button type="submit">Update Question</button>
      </form>
    </div>
  );
}

export default EditQuestion;