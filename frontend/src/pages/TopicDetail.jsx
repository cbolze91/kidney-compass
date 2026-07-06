import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function TopicDetail() {
  const { id } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topics/${id}`);
        setTopic(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

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

      <p className="topic-summary">
        {topic.summary}
      </p>

      <div className="topic-body">
        {topic.body}
      </div>

      <div className="topic-source">
        <strong>Source:</strong> {topic.sourceName}
      </div>

      <a
        href={topic.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="source-link"
      >
        Read Original Article
      </a>

      <div className="topic-buttons">
        <Link
            to={`/questions/new?topic=${topic._id}`}
            className="primary-button"
        >
         Ask a Question About This Topic
        </Link>

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