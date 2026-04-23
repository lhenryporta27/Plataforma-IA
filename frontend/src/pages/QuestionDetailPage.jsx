import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionById } from "../api/questionApi";
import { createRating } from "../api/ratingApi";
import Navbar from "../components/Navbar";
import "../styles/detail.css";

function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    try {
      const data = await getQuestionById(id);
      setQuestion(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  // 🔥 VOTAR
  const handleVote = async (value) => {
    try {
      setLoading(true);

      await createRating({
        value,
        questionId: id,
      });

      // 🔥 REFRESCAR DATOS
      await fetchQuestion();

    } catch (error) {
      console.error("Error al votar:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!question) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />

      <div className="detail-container">
        <h1>{question.text}</h1>

        <p>👤 {question.user.name}</p>

        <p>⭐ {question.averageRating.toFixed(1)}</p>

        {/* 🧠 IA */}
        <div className="ai-box">
          <h3>🧠 Evaluación IA</h3>
          <p><strong>Nivel:</strong> {question.aiLevel || "Pendiente"}</p>
          <p><strong>Feedback:</strong> {question.aiFeedback || "Pendiente"}</p>
          <p><strong>Mejora:</strong> {question.aiImproved || "Pendiente"}</p>
        </div>

        {/* ⭐ VOTACIÓN */}
        <div className="rating-box">
          <h3>Valorar pregunta</h3>

          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              onClick={() => handleVote(star)}
              disabled={loading}
            >
              ⭐ {star}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default QuestionDetailPage;