import React, { Component } from 'react';
import TournamentList from '../../components/tournamentList/tournamentList';
import NewTournamentForm from '../../components/newTournamentForm/newTournamentForm';
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
        "name": sessionStorage.getItem("nameInput"),
        "type": "single_elimination",
        "players": sessionStorage.getItem("players").split(','),
      })
      .then(res=>{
        let newTournament = res.data.data;
        this.setState({
          tournaments: [newTournament, ...this.state.tournaments]
        })
      })
      .catch(err=>console.log(err))
  }

  updateModalState = (e, overrideClose) => {
    let newState = true;

    if (overrideClose || (e && e.target.classList.value === "modal")){
      newState = false;
    } 

    console.log(newState);
    this.setState({
      isShowModal: newState
    })
  }

  render(){
    const { tournaments, isShowModal } = this.state;
    const { updateModalState,  createTournament } = this;

    return (
      <main className="tournaments">
        <div className="side-bar">
          <button onClick={(e)=>updateModalState(e)}>CREATE</button>
        </div>
        <TournamentList tournaments={tournaments}/>
        {isShowModal && (
          <Modal updateModalState={updateModalState}>
          <NewTournamentForm 
            createTournament={createTournament}
            updateModalState={updateModalState}
          />
        </Modal>
        )}
      </main>
    );
  }
}