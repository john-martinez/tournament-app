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

  updateTournamentStatus = (status) => {
    const { id } = this.props.match.params
    axios
      .put(`http://localhost:8000/tournament/${id}/${status}`, {})
      .then(_=>this.retrieveTournament())
      .catch(err=>console.log(err))
  }

  deleteTournament = () => {
    const { id } = this.props.match.params
    axios
      .delete(`http://localhost:8000/tournament/${id}/delete`)
      .then(_=>this.props.history.push('/'))
      .catch(err=>console.log(err))



  }
  renderCopy = () => {
    const { status } = this.state.tournament;
    return <Gate type={ status } handler={()=>this.updateTournamentStatus('start')} />
  }

  render(){
    const { rounds, tournament } = this.state;
    const { status, name } = tournament;
    const doesRoundsExist = !!rounds[1];
    const isGated = !!(status === 'paused' || status === 'new' || status === 'canceled')
    
    return(
      <div className="tournament-details">
        <h1 className="tournament-details__header">{ name }
          <button className="tournament-details__button" onClick={()=>this.updateTournamentStatus('pause')}>
            Pause
          </button>
          <button className="tournament-details__button" onClick={()=>this.updateTournamentStatus('cancel')}>
            Cancel
          </button>
          <button className="tournament-details__button" onClick={()=>this.deleteTournament('delete')}>
            Delete
          </button>
        </h1>
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