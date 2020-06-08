import React, { Component } from 'react';
import './kebabMenu.scss';
import axios from 'axios';
import image from '../../assets/icons/Icon-kebab-default.svg';


class Kebabmenu extends Component {
  state = { show: false }

  kebabHandler = e => this.setState({ show: !this.state.show })
  
  componentDidMount(){
    document.addEventListener('click', e=>{
      if (e.target.classList[0] !== "kebab__button"){
        this.setState({ show: false })
      }
    });
  }

  updateTournamentStatus = (status) => {
    axios
      .put(`http://localhost:8000/tournament/${this.props.id}/${status}`, {})
      .then(_=>this.props.retrieveTournaments())
      .catch(err=>console.log(err))
  }

  deleteTournament = () => {
    axios
      .delete(`http://localhost:8000/tournament/${this.props.id}/delete`)
      .then(_=>this.props.retrieveTournaments())
      .catch(err=>console.log(err))
  }
  
  render(){    
    const { kebabHandler, deleteTournament, updateTournamentStatus } = this;
    const { status } = this.props;
    const isCancelled = status !== 'canceled';
    const isCompleted = status !== 'completed';
    const isNew = status === 'new';
    const isPaused = status === 'paused';

    return(
      <div className="kebab" onClick={kebabHandler}>
        <img src={image} className={`kebab__button ${this.state.show ? 'kebab__button--rotated' : ''}`} />
        {this.state.show 
          ? <div className="kebab__hidden" onClick={this.testHandler}>
            { isCancelled && isCompleted && (
                isPaused || isNew
              ? <div className="kebab__menu-item" onClick={()=>updateTournamentStatus('start')}>
                  Start
                </div>
              : <div className="kebab__menu-item" onClick={()=>updateTournamentStatus('pause')}>
                  Pause
                </div>
              )
            } 
              
            { isCompleted && isCancelled && (
              <div className="kebab__menu-item" onClick={()=>updateTournamentStatus('cancel')}>
                Cancel
              </div>
            )}
              <div className="kebab__menu-item" onClick={()=>deleteTournament('delete')}>
                Delete
              </div>              
            </div> 
          : "" }
      </div>
    );
  }
}

export default Kebabmenu;