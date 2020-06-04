import React, { Component } from 'react';
import TournamentList from '../../components/tournamentList/tournamentList';
import Modal from '../../components/modal/modal';
import axios from 'axios';
import './tournaments.scss';

export default class Tournament extends Component {
  state = {
    tournaments: [],
    isShowModal: false,
  }

  componentDidMount() {
    this.retrieveTournaments();
  }

  retrieveTournaments = async () => {
   let res = await axios.get('http://localhost:8000/tournament/')
   this.setState({
     tournaments: res.data.data.reverse()
   })
  }

  createTournament = () => {
    axios
      .post(`http://localhost:8000/tournament/create`, {
        "name": "Test",
        "type": "single_elimination",
        "players": [
          "Player 1",
          "Player 2",
          "Player 3",
          "Player 4",
          "Player 5",
          "Player 6",
          "Player 7",
          "Player 8",
        ]
      })
      .then(res=>{
        let newTournament = res.data.data;
        this.setState({
          tournaments: [newTournament, ...this.state.tournaments]
        })
      })
      .catch(err=>console.log(err))
  }

  updateModalState = (e,modalState) => {
    let newState = true;

    if (!modalState && e.target.classList.value === "modal"){
      newState = false;
    } 

    this.setState({
      isShowModal: newState
    })
  }

  render(){
    const { tournaments, isShowModal } = this.state;

    return (
      <main className="tournaments">
        <div className="side-bar">
          <button onClick={(e)=>this.updateModalState(e, true)}>CREATE</button>
        </div>
        <TournamentList tournaments={tournaments}/>
        {isShowModal && <Modal updateModalState={this.updateModalState}/>}
      </main>
    );
  }
}