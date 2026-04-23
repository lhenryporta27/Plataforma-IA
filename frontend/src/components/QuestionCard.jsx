import { useNavigate } from "react-router-dom";
import "../styles/question.css";

function QuestionCard({ question }) {
    const navigate = useNavigate();

  return (

    <div className="question-card"
    onClick={() => navigate(`/question/${question.id}`)}>

      <h3>{question.content}</h3>

      <p>👤 {question.user.name}</p>

      <p>⭐ {question.averageRating.toFixed(1)}</p>
    </div>
  );
}

export default QuestionCard;