import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionsByCourse } from "../api/questionApi";
import QuestionCard from "../components/QuestionCard";
import Navbar from "../components/Navbar";

function CourseDetailPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByCourse(id);
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [id]);

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>📚 Preguntas del curso</h1>

        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </>
  );
}

export default CourseDetailPage;