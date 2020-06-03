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
    const doesRoundsExist = !!this.state.rounds[1];
    
    return(
      <div className="tournament-details">
        {doesRoundsExist && this.renderRoundList()}
      </div>
    );
  }
}