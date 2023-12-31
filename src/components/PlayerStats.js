import React from 'react';
import '../css/PlayerCard.css'

const PlayerCard = ({ player, cardNumber }) => {



    const nbaTeamColors = {
        ATL: '#E03A3E', // Atlanta Hawks
        BOS: '#007A33', // Boston Celtics
        BKN: '#000000', // Brooklyn Nets
        CHA: '#00788C', // Charlotte Hornets
        CHI: '#CE1141', // Chicago Bulls
        CLE: '#860038', // Cleveland Cavaliers
        DAL: '#00538C', // Dallas Mavericks
        DEN: '#0E2240', // Denver Nuggets
        DET: '#C8102E', // Detroit Pistons
        GSW: '#1D428A', // Golden State Warriors
        HOU: '#CE1141', // Houston Rockets
        IND: '#002D62', // Indiana Pacers
        LAC: '#1D428A', // LA Clippers
        LAL: '#552583', // Los Angeles Lakers
        MEM: '#12173F', // Memphis Grizzlies
        MIA: '#98002E', // Miami Heat
        MIL: '#00471B', // Milwaukee Bucks
        MIN: '#0C2340', // Minnesota Timberwolves
        NOP: '#0C2340', // New Orleans Pelicans
        NYK: '#006BB6', // New York Knicks
        OKC: '#007AC1', // Oklahoma City Thunder
        ORL: '#0077C0', // Orlando Magic
        PHI: '#006BB6', // Philadelphia 76ers
        PHX: '#1D1160', // Phoenix Suns
        POR: '#E03A3E', // Portland Trail Blazers
        SAC: '#5A2D81', // Sacramento Kings
        SAS: '#000000', // San Antonio Spurs
        TOR: '#CE1141', // Toronto Raptors
        UTA: '#002B5C', // Utah Jazz
        WAS: '#002B5C', // Washington Wizards
      };

      const cardStyle = {
        backgroundColor: nbaTeamColors[player.team.abbreviation],
        
      };

  let firstName, lastName;
  try {
    firstName = player?.player?.first_name || 'Unknown';
    lastName = player?.player?.last_name || 'Unknown';
  } catch (error) {
    console.error('Error fetching names:', error);
  }

  return (
    <div className="player-card" style={cardStyle}>
      <div className="name-container">
        <h2> {cardNumber}. {firstName} {lastName} ({player.team.abbreviation})</h2>
      </div>
      <div className="stats-container">
        <div className="stat">
          <p className="stat-label">Points:</p>
          <p className="stat-value">{player.pts}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Assists:</p>
          <p className="stat-value">{player.ast}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Rebounds:</p>
          <p className="stat-value">{player.reb}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
