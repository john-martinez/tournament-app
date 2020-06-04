import React, { Component } from 'react';
import Tournament from '../../components/tournament/tournament';
import './tournamentList.scss';
import axios from 'axios';

export default class TournamentList extends Component {
  state = {
    tournaments: [],
  }
  
  componentDidMount() {
    this.retrieveTournaments();
  }

  retrieveTournaments = async () => {
   let res = await axios.get('http://localhost:8000/tournament/')
   this.setState({
     tournaments: res.data.data
   })
  }

  renderTournaments = () => {
    return this.state.tournaments
      .map(tournament => <Tournament key={tournament._id} data={tournament} />)
  }

  render(){
    const { tournaments } = this.state;
    console.log(tournaments)
    return(
      <div className="tournament-list">
        { tournaments.length && this.renderTournaments() }
      </div>
    );
  }
}