import React from 'react';
import Tournament from '../tournament/tournament';
import './tournamentList.scss';

export default function TournamentList({ tournaments, history }) {

  const renderTournaments = () => {
    return tournaments
      .map(tournament => <Tournament key={tournament._id} data={tournament} history={history} />)
  }

  return(
    <div className="tournament-list">
      { tournaments.length && renderTournaments() }
    </div>
  );
}