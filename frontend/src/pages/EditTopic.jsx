import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditTopic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    body: '',
    sourceName: '',
    sourceUrl: '',
  });

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topics/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          title: response.data.title || '',
          category: response.data.category || '',
          summary: response.data.summary || '',
          body: response.data.body || '',
          sourceName: response.data.sourceName || '',
          sourceUrl: response.data.sourceUrl || '',
        });
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Could not load topic');
        navigate('/topics');
      }
    };

    fetchTopic();
  }, [id, navigate, token]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/topics/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/topics/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Topic could not be updated');
    }
  };

  return (
    <div className="form-page">
      <h1>Edit Topic</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Summary"
          required
        />

        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Body"
          required
        />

        <input
          name="sourceName"
          value={formData.sourceName}
          onChange={handleChange}
          placeholder="Source Name"
        />

        <input
          name="sourceUrl"
          value={formData.sourceUrl}
          onChange={handleChange}
          placeholder="Source URL"
        />

        <button type="submit">
          Update Topic
        </button>
      </form>
    </div>
  );
}

export default EditTopic;