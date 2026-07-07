import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topics/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTopic(response.data);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Could not load topic.');
        navigate('/topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id, token, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this topic?'
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/topics/${topic._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/topics');
    } catch (error) {
      alert(error.response?.data?.message || 'Topic could not be deleted.');
    }
  };

  if (loading) {
    return <h2>Loading topic...</h2>;
  }

  if (!topic) {
    return <h2>Topic not found.</h2>;
  }

  return (
    <div className="topic-detail-page">
      <p className="topic-category">{topic.category}</p>

      <h1>{topic.title}</h1>

      <p className="topic-summary">{topic.summary}</p>

      <div className="topic-body">{topic.body}</div>

      {topic.sourceName && (
        <div className="topic-source">
          <strong>Source:</strong> {topic.sourceName}
        </div>
      )}

      {topic.sourceUrl && (
        <a
          href={topic.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="source-link"
        >
          Read Original Article
        </a>
      )}

      <div className="topic-buttons">
        <Link
          to={`/questions/new?topic=${topic._id}`}
          className="primary-button"
        >
          Save a Question About This Topic
        </Link>

        <Link
          to={`/topics/${topic._id}/edit`}
          className="secondary-button"
        >
          Edit Topic
        </Link>

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete Topic
        </button>

        <Link
          to="/topics"
          className="secondary-button"
        >
          ← Back to Library
        </Link>
      </div>
    </div>
  );
}

export default TopicDetail;