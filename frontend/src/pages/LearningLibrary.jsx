import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import TopicCard from '../components/TopicCard';

function LearningLibrary() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

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
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [token]);

  if (loading) {
    return <h2>Loading topics...</h2>;
  }

  return (
    <div className="library-page">
      <div className="page-header">
        <h1>Learning Library</h1>

        <Link to="/topics/new" className="primary-button">
          Add Topic
        </Link>
      </div>

      {topics.length === 0 ? (
        <div className="empty-state">
          <h2>No education topics available yet.</h2>

          <p>
            Build your own Learning Library with trusted kidney education topics and resources to support your dialysis journey.
          </p>
        </div>
      ) : (
        <div className="topic-grid">
          {topics.map((topic) => (
            <TopicCard key={topic._id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LearningLibrary;