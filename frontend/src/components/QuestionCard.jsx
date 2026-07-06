import { Link } from 'react-router-dom';

function QuestionCard({ question, onDelete }) {
  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      <p>
        <strong>Topic:</strong>{' '}
        {question.educationTopic?.title || 'No topic selected'}
      </p>

      <p>
        <strong>Status:</strong> {question.status}
      </p>

      {question.notes && (
        <p>
          <strong>Notes:</strong> {question.notes}
        </p>
      )}

      <div className="question-actions">
        <Link to={`/questions/${question._id}/edit`} className="secondary-button">
          Edit
        </Link>

        <button onClick={() => onDelete(question._id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;