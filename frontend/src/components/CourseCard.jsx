import { useNavigate } from "react-router-dom";
import "../styles/course.css";

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="course-card" onClick={() => navigate(`/courses/${course.id}`)}>
      <h3>{course.title}</h3>
      <button>Entrar</button>
    </div>
  );
}

export default CourseCard;