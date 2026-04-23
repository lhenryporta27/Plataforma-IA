import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CoursesPage from "../pages/CoursePage";
import CourseDetailPage from "../pages/CourseDetailPage";
import QuestionDetailPage from "../pages/QuestionDetailPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/question/:id" element={<QuestionDetailPage />} />
    </Routes>
  );
}

export default AppRouter;