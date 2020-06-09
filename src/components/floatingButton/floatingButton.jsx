import React, { Component } from 'react';
import './floatingButton.scss';

export default class FloatingButton extends Component {
  state = {
    isShowing: false,
  }

  render(){
    const { text, icon, callback } = this.props;
    const { isShowing } = this.state;

    return(
      <div className="floating-button">
        <div 
          className={`floating-button__text ${ !isShowing ? 'floating-button__text--hidden' : ''}`}
          onClick={()=>callback()}
        >
          {text}
        </div>      
        <div className="floating-button__icon" onClick={()=>this.setState({ isShowing: !isShowing })}>
          <span> {icon} </span>
        </div>
      </div>
    );
  }
}