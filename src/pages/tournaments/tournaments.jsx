import React, { Component } from 'react';
import TournamentList from '../../components/tournamentList/tournamentList';
import './tournaments.scss';

export default class Tournament extends Component {
  render(){
    return(
      <main className="tournaments">
        <TournamentList />
      </main>
    );
  }
}