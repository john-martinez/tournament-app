import React, { Component } from 'react';
import './kebabMenu.scss';
import image from '../../assets/icons/Icon-kebab-default.svg';
import { updateTournamentStatus, deleteTournament } from '../../util';


class Kebabmenu extends Component {
  state = { show: false }

  kebabHandler = e => {
    this.setState({ show: !this.state.show })
  }
  
  componentDidMount(){
    document.addEventListener('click', e=>{
      if (!e.target.classList.value.includes('kebab')){
        this.setState({ show: false })
      }
    });
  }

  render(){    
    const { kebabHandler } = this;
    const { status, id, retrieveTournaments } = this.props;
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
              ? <div className="kebab__menu-item" onClick={()=>updateTournamentStatus(id, 'start', retrieveTournaments)}>
                  Start
                </div>
              : <div className="kebab__menu-item" onClick={()=>updateTournamentStatus(id, 'pause', retrieveTournaments)}>
                  Pause
                </div>
              )
            } 
              
            { isCompleted && isCancelled && (
              <div className="kebab__menu-item" onClick={()=>updateTournamentStatus(id, 'cancel', retrieveTournaments)}>
                Cancel
              </div>
            )}
              <div className="kebab__menu-item" onClick={()=>deleteTournament(id, retrieveTournaments)}>
                Delete
              </div>              
            </div> 
          : "" }
      </div>
    );
  }
}

export default Kebabmenu;