import React from 'react';
import Match from '../../components/match/match';
import './round.scss';

export default function Round({
  round,
  matches
}){

  const renderMatches = (matches) => matches.map( data=> <Match data={data} key={data._id} /> )

  return(
    <div className="round">
      <h2 className="round__header">Round {round}</h2>
      {renderMatches(matches)}
    </div>
  );
}