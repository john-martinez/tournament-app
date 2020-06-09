import React, { Component } from 'react';
import TournamentList from '../../components/tournamentList/tournamentList';
import NewTournamentForm from '../../components/newTournamentForm/newTournamentForm';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from '../../components/modal/modal';
import FloatingButton from '../../components/floatingButton/floatingButton';
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
    
    this.setState({
      isShowModal: newState
    })
  }

  render(){
    const { tournaments, isShowModal } = this.state;
    const { updateModalState,  createTournament, retrieveTournaments } = this;
<<<<<<< HEAD
    if (tournaments.length) {
      return (
        <main className="tournaments">
          <div className="side-bar">
            <button onClick={(e)=>updateModalState(e)}>CREATE</button>
          </div>
          <TournamentList 
            tournaments={tournaments} 
            history={this.props.history}
            retrieveTournaments={retrieveTournaments}
          />
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
    } else {
      return <div>
        <ClipLoader />
      </div>
    }
=======

    return (
      <main className="tournaments">
        <div className="tournaments__banner">
          <h1>Tournaments</h1>
        </div>
        <TournamentList 
          tournaments={tournaments} 
          history={this.props.history}
          retrieveTournaments={retrieveTournaments}
        />
        {isShowModal && (
          <Modal updateModalState={updateModalState}>
          <NewTournamentForm 
            createTournament={createTournament}
            updateModalState={updateModalState}
          />
        </Modal>
        )}
        <FloatingButton 
          icon="+" 
          text="Create Tournament" 
          callback={updateModalState}
        />
      </main>
    );
>>>>>>> fdf6a328cd67aac5e1da400c61b25a8f839d8cec
  }
}