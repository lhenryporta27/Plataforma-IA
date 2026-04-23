import { useEffect, useState } from "react";
import { getTopUsers } from "../api/rankingApi";
import "../styles/ranking.css";

function RankingList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getTopUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error cargando ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) return <p>Cargando ranking...</p>;

  return (
    <div className="ranking">
      {users.map((user, index) => (
        <div key={user.id} className="ranking-item">
          <span>#{index + 1}</span>
          <span>{user.name}</span>
          <span>⭐ {user.totalStars}</span>
        </div>
      ))}
    </div>
  );
}

export default RankingList;