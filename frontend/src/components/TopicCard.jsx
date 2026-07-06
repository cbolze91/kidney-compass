import { Link } from 'react-router-dom';

function TopicCard({ topic }) {
  return (
    <div className="topic-card">
      <h2>{topic.title}</h2>

      <p className="category">
        {topic.category}
      </p>

      <p>{topic.summary}</p>

      <Link to={`/topics/${topic._id}`}>
        Read More →
      </Link>
    </div>
  );
}

export default TopicCard;