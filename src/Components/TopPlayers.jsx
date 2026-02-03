import React from "react";
import "./TopPlayers.css";

const TopPlayers = ({ goBack }) => {
  // Get all user scores from userScores
  const allScores = JSON.parse(localStorage.getItem("userScores")) || {};

  // Convert to array and calculate total
  const leaderboard = Object.keys(allScores).map((name) => {
    const s = allScores[name];
    return { name, ...s, total: s.html + s.css + s.js + s.react };
  });

  // Sort descending by total marks
  leaderboard.sort((a, b) => b.total - a.total);

  // Get top 5
  const topFive = leaderboard.slice(0, 5);

  const resetGame = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="top-container">
      <h1>🏆 Top 5 Players</h1>

      {topFive.map((player, index) => (
        <div key={index} className="player-card">
          <h2>#{index + 1}</h2>
          <p>Name: {player.name}</p>
          <p>Total Score: {player.total} / 20</p>
          <div style={{ fontSize: "13px" }}>
            HTML: {player.html} | CSS: {player.css} | JS: {player.js} | React: {player.react}
          </div>
        </div>
      ))}

      <button onClick={goBack}>Back</button>
      <button onClick={resetGame} className="reset-btn">Reset Leaderboard</button>
    </div>
  );
};

export default TopPlayers;
