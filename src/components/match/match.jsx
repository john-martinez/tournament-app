import React from 'react';
import './match.scss';

export default function Match({ data }){
  const {
    _id, 
    player_1, 
    player_2, 
    match, 
  } = data;

  return (
    <div className="match" key={_id}>
      <h3 className="match__number">Match {match}</h3>
      <div className="match__player">
      <span>
        {player_1 && player_1.name}
      </span>
      <span>
        {player_1 && player_1.score}
      </span>
      </div>
      <div className="match__player">
      <span>
        {player_2 && player_2.name}
      </span>
      <span>
        {player_2 && player_2.score}
      </span>
      </div>
    </div>
  );
}