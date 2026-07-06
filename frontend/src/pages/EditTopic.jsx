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
        const response = await api.get(`/topics/${id}`);

        setFormData({
          title: response.data.title || '',
          category: response.data.category || '',
          summary: response.data.summary || '',
          body: response.data.body || '',
          sourceName: response.data.sourceName || '',
          sourceUrl: response.data.sourceUrl || '',
        });
      } catch {
        alert('Could not load topic');
        navigate('/topics');
      }
    };

    fetchTopic();
  }, [id, navigate]);

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
        <input name="title" value={formData.title} onChange={handleChange} required />
        <input name="category" value={formData.category} onChange={handleChange} required />
        <textarea name="summary" value={formData.summary} onChange={handleChange} required />
        <textarea name="body" value={formData.body} onChange={handleChange} required />
        <input name="sourceName" value={formData.sourceName} onChange={handleChange} />
        <input name="sourceUrl" value={formData.sourceUrl} onChange={handleChange} />

        <button type="submit">Update Topic</button>
      </form>
    </div>
  );
}

export default EditTopic;