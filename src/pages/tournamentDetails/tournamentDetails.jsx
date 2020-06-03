import React, { Component }  from 'react';
import Round from '../../components/round/round';
import Gate from '../../components/gate/gate';
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

  startTournament = () => {
    const { id } = this.props.match.params
    axios.put(`http://localhost:8000/tournament/${id}/start`, {})
      .then(_=>this.retrieveTournament())
      .catch(err=>console.log(err))
  }
  
  
  renderCopy = () => {
    const { status } = this.state.tournament;
    return <Gate type={ status } handler={this.startTournament} />
  }
  render(){
    const { rounds, tournament } = this.state;
    const { status } = tournament;
    const doesRoundsExist = !!rounds[1];
    const isGated = !!(status === 'paused' || status === 'new' || status === 'canceled')
    console.log(tournament);
    return(
      <div className="tournament-details">
        {doesRoundsExist && this.renderRoundList()}
        { isGated && (
          <div className="tournament-details__gate">
            {this.renderCopy()}
          </div>
        )}
      </div>
    );
  }
}