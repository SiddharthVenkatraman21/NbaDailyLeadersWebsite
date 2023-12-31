import '../css/GameCard.css'


import React, { useRef, useEffect } from 'react';

const GameCard = ({ game }) => {
  const { id, home_team, home_team_score, visitor_team, visitor_team_score, period, status, time } = game;
  const teamInfoHomeRef = useRef(null);
  const teamInfoVisitorRef = useRef(null);

  let gameStatus;

  if (status === "Final") {
    gameStatus = period === 5 ? "Final/OT" : "Final";
  } else {
    if (period === 0) {
      const timeString = status;
      const date = new Date(timeString);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
      gameStatus = formattedTime;
    } else {
      gameStatus = time;
    }
  }




  function boldWinner() {
    if (status === "Final") {
      if (home_team_score > visitor_team_score) {
        teamInfoVisitorRef.current.style.color = '#CCCCCC';
      } else {
        teamInfoHomeRef.current.style.color = '#CCCCCC';
      }
    }
  }

  // Use useEffect to run boldWinner after the component has rendered
  useEffect(() => {
    boldWinner();
  }, []); // The empty dependency array ensures that it runs once after the initial render

  return (
    <div className="game-card">
      <div className="team-info-home" ref={teamInfoHomeRef}>
        <h3>{home_team.name}</h3>
        {!status.includes(':') && (<h3>{home_team_score}</h3>)}
      </div>
      <div className="team-info-visitor" ref={teamInfoVisitorRef}>
        <h3>{visitor_team.name}</h3>
        {!status.includes(':') && (<h3>{visitor_team_score}</h3>)}
      </div>
      <h3 className="period">{gameStatus}</h3>
    </div>
  );
};

export default GameCard;

