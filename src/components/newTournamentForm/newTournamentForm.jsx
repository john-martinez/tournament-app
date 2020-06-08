import React, { Component } from 'react';
import './newTournamentForm.scss';

export default class NewTournamentForm extends Component {
  state = {
    nameInput: sessionStorage.getItem("nameInput") || '',
    playersInput: '',
    players: (sessionStorage.getItem("players") && sessionStorage.getItem("players").split(",")) || [],
    onNextStep: false,
    isNameEmpty: false,
    hasEnoughPlayers: true,
    isPlayersInputEmpty: false,
  }

  nextStep = async () => {
    const { players, onNextStep, nameInput, playersInput } = this.state;
    const MIN_PLAYERS_COUNT = 2;
    const isNameEmpty = !nameInput.length;
    

    if (!onNextStep) {
      if (isNameEmpty){
        this.setState({ isNameEmpty: true })
      } else {
        this.setState({ onNextStep: true, isNameEmpty: false })
      }
      
    } else if (onNextStep) {
      if (players.length >= MIN_PLAYERS_COUNT) {
        await this.props.createTournament();
        sessionStorage.removeItem("players");
        sessionStorage.removeItem("nameInput");
        this.props.updateModalState(null,true);
      } else {
        this.setState({ hasEnoughPlayers: false })
      }
    }
  }

  addPlayer = (e) => {
    e.preventDefault();
    const { players, playersInput } = this.state;
    const isPlayersInputEmpty = !playersInput.length;

    if (isPlayersInputEmpty) {
      this.setState({ isPlayersInputEmpty: true })
    } else {
      const newPlayers = [...players, playersInput];
      this.setState({
        players: newPlayers,
        playersInput: '',
        isPlayersInputEmpty: false,
      })
      sessionStorage.setItem("players", newPlayers);
    }
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
    const { 
      nameInput, 
      playersInput, 
      onNextStep, 
      players, 
      isNameEmpty,
      isPlayersInputEmpty,
      hasEnoughPlayers
    } = this.state;

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
                className={`${isNameEmpty ? 'new-tournament-form__field--error' : ''}`} 
              />
              { isNameEmpty && (
                <span className="new-tournament-form__error">Please supply a name</span>
              )}
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
                <div className="new-tournament-form__input-container">
                  <input 
                    type="text" 
                    name="players" 
                    value={playersInput}
                    onChange={(e)=>this.setState({ playersInput: e.target.value})} 
                    className={`${isPlayersInputEmpty && 'new-tournament-form__field--error'}`} 
                  />
                  <button className="new-tournament-form__add" onClick={this.addPlayer}>+</button>
                </div>
                { isPlayersInputEmpty && (
                  <span className="new-tournament-form__error">This field cannot be empty</span>
                )}
                { !hasEnoughPlayers && (
                  <span className="new-tournament-form__error">Must supply 2 or more players</span>
                )}
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