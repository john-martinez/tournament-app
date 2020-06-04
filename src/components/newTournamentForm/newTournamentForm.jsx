import React, { Component } from 'react';
import './newTournamentForm.scss';

export default class NewTournamentForm extends Component {
  state = {
    nameInput: sessionStorage.getItem("nameInput"),
    playersInput: '',
    players: sessionStorage.getItem("players").split(",") || [],
    onNextStep: false,
  }

  nextStep = () => {
    const {  players, onNextStep } = this.state;
    const MIN_PLAYERS_COUNT = 2;

    if (!onNextStep) {
      this.setState({ onNextStep: true })
    } else if (onNextStep && players.length >= MIN_PLAYERS_COUNT) {
      this.props.createTournament();
    }
  }

  addPlayer = (e) => {
    e.preventDefault();
    const newPlayers = [...this.state.players, this.state.playersInput];
    this.setState({
      players: newPlayers,
      playersInput: '',
    })
    sessionStorage.setItem("players", newPlayers);
  }

  updateNameInput = (e) => {
    sessionStorage.setItem("nameInput", e.target.value);
    this.setState({ nameInput: e.target.value});
  }

  removePlayer = (index) => {
    const playersContainer = [...this.state.players];
    playersContainer.splice(index, 1)
    
    this.setState({ players: playersContainer })
    sessionStorage.setItem("players", playersContainer);
  }
  render(){
    const { nameInput, playersInput, onNextStep, players } = this.state;

    return(
      <div className="new-tournament-form">
        <h2>{nameInput && onNextStep ? nameInput : 'Create Tournament'}</h2>

        {!onNextStep 
          ? <div className="new-tournament-form__item">
              <label htmlFor="name"> NAME </label>
              <input 
                type="text" 
                name="name" 
                value={nameInput} 
                onChange={this.updateNameInput} 
              />
            </div>

          : <>
              <form onSubmit={this.addPlayer} className="new-tournament-form__item">
                <span 
                  className="new-tournament-form__breadcrumb"
                  onClick={()=>this.setState({ onNextStep: false })}
                >
                  {"< Back "}
                </span> 
                <label htmlFor="players">Add Player</label>
                <div>
                  <input 
                    type="text" 
                    name="players" 
                    value={playersInput}
                    onChange={(e)=>this.setState({ playersInput: e.target.value})}  
                  />
                  <button className="new-tournament-form__add" onClick={this.addPlayer}>+</button>
                </div>
              </form>
              <div className="new-tournament-form__item">
                <ol className="new-tournament-form__players-list">
                  {players.map((player, index)=>(
                    <li key={index}>
                      <span>
                        <strong>{index + 1}. </strong> 
                        <span>{player}</span>
                      </span> 
                      <span className="new-tournament-form__delete" onClick={()=>this.removePlayer(index)}> X </span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
        }

        <div className="new-tournament-form__item">
          <button 
            className="new-tournament-form__cta" 
            onClick={this.nextStep}>{this.state.onNextStep ? 'SUBMIT' : 'NEXT'}
          </button>
        </div>
      </div>
    );
  }
}