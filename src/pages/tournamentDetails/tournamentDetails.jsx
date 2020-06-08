import React, { Component }  from 'react';
import Round from '../../components/round/round';
import Gate from '../../components/gate/gate';
import { Link } from 'react-router-dom';
import './tournamentDetails.scss';
import { updateTournamentStatus } from '../../util';
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

  renderCopy = () => {
    const { status } = this.state.tournament;
    const { id } = this.props.match.params;
    return <Gate type={ status } handler={()=>updateTournamentStatus(id, 'start', this.retrieveTournament)} />
  }

  render(){
    const { rounds, tournament } = this.state;
    const { status, name } = tournament;
    const doesRoundsExist = !!rounds[1];
    const isGated = !!(status === 'paused' || status === 'new' || status === 'canceled')
    
    return(
      <div className="tournament-details">
        <div className="tournament-details__header">
          <Link to="/tournaments" className="tournament-details__back"> {'< BACK'} </Link>
          <h1> { name } </h1>
        </div>
        
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