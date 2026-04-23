import Navbar from "../components/Navbar";
import RankingList from "../components/RankingList";
import "../styles/home.css";

function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Aprende creando preguntas</h1>
          <p>
            Plataforma donde los estudiantes mejoran su aprendizaje
            formulando preguntas y recibiendo retroalimentación con IA.
          </p>

          <button className="btn-primary">Explorar cursos</button>
        </div>
      </section>

      {/* RANKING */}
      <section className="ranking-section">
        <h2>🏆 Mejores estudiantes</h2>
        <RankingList />
      </section>
    </>
  );
}

export default HomePage;