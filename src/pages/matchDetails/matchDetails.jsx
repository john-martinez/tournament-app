import React, { Component } from 'react';
import './matchDetails.scss';
import axios from 'axios';

export default class MatchDetails extends Component {
  state = {
    match: {}
  }
  
  componentDidMount() {
    this.retrieveMatchResult();
  }

  retrieveMatchResult = async() => {
    const { id } = this.props.match.params;
    let player_1_score = 0;
    let player_2_score = 0;

    // keep randomizing number until someone wins
    do {
      player_1_score = Math.floor(Math.random()*5);
      player_2_score = Math.floor(Math.random()*5);
    } while (player_1_score === player_2_score);
    
    axios.put(`http://localhost:8000/match/${id}`, {
      player_1_score,
      player_2_score
    })
    .then(res=> {
      this.setState({
        match: res.data.data,
      })
    })
    .catch(_=>this.retrieveMatchResult()) // recalling function to prevent break route
  }

  isWinner = (player) => {
    return player.winner 
      ? 'match-details__item--winner' 
      : 'match-details__item--loser'
  }

  render(){
    const { match, player_1, player_2 } = this.state.match;
    if (match) {
      return(
        <div className="match-details">
          <h1 className="match-details__name">Match {match}</h1>
          <div className="match-details__container">
            <div className={`match-details__item ${this.isWinner(player_1)}`}>
              <h2> {player_1.name} </h2>
              <h4 className="match-details__result">{player_1.winner ? "WINNER" : "LOSER"}</h4>
              <h3>{player_1.score}</h3>
            </div>
            <div className="match-details__item match-details__item--versus">
              <h2>V.S.</h2>
            </div>
            <div className={`match-details__item ${this.isWinner(player_2)}`}>
              <h2> {player_2.name} </h2>
              <h4 className="match-details__result">{player_2.winner ? "WINNER" : "LOSER"}</h4>
              <h3>{player_2.score}</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <h1>LOADING...</h1>
      );
    }
  }
}