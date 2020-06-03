import React, { Component }  from 'react';
import Round from '../../components/round/round';
import './tournamentDetails.scss';
import axios from 'axios';

export default class TournamentDetails extends Component {
  state = {
    tournament: {},
    rounds: {},
  }

  componentDidMount(){
   this.retrieveTournament(); 
  }

  retrieveTournament = async () => {
    const { id } = this.props.match.params
    const rounds = {};

    let res = await axios.get(`http://localhost:8000/tournament/${id}`)
    res.data.data.matches.forEach(match => {
      const { round } = match;
      if (!rounds[round]){
        rounds[round] = [];
      }
      rounds[round].push(match);
    })

    this.setState({
      tournament: res.data.data, 
      rounds,
    })
   }

  renderRoundList = () => {
    let rounds = [];

    for (let round in this.state.rounds){
      rounds = [ ...rounds, <Round key={round} round={round} matches={this.state.rounds[round]} /> ]
    }
    return rounds;
  }
  
  render(){
    const { rounds, tournament } = this.state;
    const doesRoundsExist = !!rounds[1];
    const isGated = !!(tournament.status === 'paused')

    return(
      <div className="tournament-details">
        {doesRoundsExist && this.renderRoundList()}
        { isGated && (
          <div className="tournament-details__gate">
            <h2 className="tournament-details__copy">Tournament is currently paused</h2>
          </div>
        )}
        
      </div>
    );
  }
}