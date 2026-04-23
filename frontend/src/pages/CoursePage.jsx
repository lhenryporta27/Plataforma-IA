import { useEffect, useState } from "react";
import { getCourses } from "../api/courseApi";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import "../styles/course.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error cargando cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />

      <div className="courses-page">
        <h1>📚 Cursos disponibles</h1>

        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursesPage;