import React from "react";
import "./TopPlayers.css";

const TopPlayers = ({ goBack }) => {
  // Get all user scores
  const allScores = JSON.parse(localStorage.getItem("userScores")) || {};

  // Convert to array safely and avoid NaN
  const leaderboard = Object.keys(allScores).map((name) => {
    const s = allScores[name] || {};

    const html = s.html || 0;
    const css = s.css || 0;
    const js = s.js || 0;
    const react = s.react || 0;

    return {
      name,
      html,
      css,
      js,
      react,
      total: html + css + js + react,
    };
  });

  // Sort by total
  leaderboard.sort((a, b) => b.total - a.total);

  // Top 5
  const topFive = leaderboard.slice(0, 5);

  const resetGame = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="top-container">
      <h1 >🏆 Top 5 Players</h1>

      <div className="player-grid">
        {topFive.map((player, index) => (
          <div key={index} className="player-card">
            <h2>#{index + 1}</h2>
            <p><strong>Name:</strong> {player.name}</p>
            <p><strong>Total:</strong> {player.total} / 20</p>
            <p style={{ fontSize: "11px" }}>
              HTML: {player.html} | CSS: {player.css} | JS: {player.js} | React: {player.react}
            </p>
          </div>
        ))}
      </div>
<div className="btn-container">
      <button onClick={goBack} className="reset-btn">Back</button>
      <button onClick={resetGame} className="reset-btn">
        Reset Leaderboard
      </button>
      </div>
    </div>
  );
};

export default TopPlayers;
