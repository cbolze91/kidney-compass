import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AddTopic() {
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/topics', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/topics');
    } catch (error) {
      alert(error.response?.data?.message || 'Topic could not be created');
    }
  };

  return (
    <div className="form-page">
      <h1>Add Topic</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <textarea name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} required />
        <textarea name="body" placeholder="Body" value={formData.body} onChange={handleChange} required />
        <input name="sourceName" placeholder="Source Name" value={formData.sourceName} onChange={handleChange} />
        <input name="sourceUrl" placeholder="Source URL" value={formData.sourceUrl} onChange={handleChange} />

        <button type="submit">Save Topic</button>
      </form>
    </div>
  );
}

export default AddTopic;