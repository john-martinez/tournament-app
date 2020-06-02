import React, { Component }  from 'react';
import axios from 'axios';

export default class TournamentDetails extends Component {
  state = {
    tournament: {},
  }

  componentDidMount(){
   this.retrieveTournament(); 
  }

  retrieveTournament = async () => {
    const { id } = this.props.match.params

    let res = await axios.get(`http://localhost:8000/tournament/${id}`)
    this.setState({
      tournament: res.data.data
    })
   }

  render(){
    console.log(this.state.tournament)
    return(
      <div>HELLO</div>
    );
  }
}