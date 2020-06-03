import React from 'react';
import './match.scss';

export default function Match({ data }){
  const {
    _id, 
    player_1, 
    player_2, 
    match, 
  } = data;

  const isFinished = !!(player_1 && player_2 && (player_1.winner || player_2.winner));
  const hasAllPlayers = !!(player_1 && player_2);
  const isClickable = !hasAllPlayers || isFinished;
  
  return (
    <div 
      className={`match ${isClickable ? 'match--unclickable' : ''}`} 
      key={_id}
    >
      <h3 className="match__number">Match {match}</h3>
      <div className="match__player">
      <span className="match__name">
        {player_1 && player_1.name}
        {player_1 && player_1.winner && (
          <span className="match__winner">
           WIN
          </span>
        )}
      </span>
      <span>
        {player_1 && player_1.score}
      </span>
      </div>
      <div className="match__player">
      <span className="match__name">
        {player_2 && player_2.name}
        {player_2 && player_2.winner && (
          <span className="match__winner">
           WIN
          </span>
        )}
      </span>
      <span>
        {player_2 && player_2.score}
      </span>
      </div>
    </div>
  );
}