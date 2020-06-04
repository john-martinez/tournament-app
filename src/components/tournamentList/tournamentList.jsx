import React from 'react';
import Tournament from '../tournament/tournament';
import './tournamentList.scss';

export default function TournamentList({ tournaments }) {

  const renderTournaments = () => {
    return tournaments
      .map(tournament => <Tournament key={tournament._id} data={tournament} />)
  }

  return(
    <div className="tournament-list">
      { tournaments.length && renderTournaments() }
    </div>
  );
}