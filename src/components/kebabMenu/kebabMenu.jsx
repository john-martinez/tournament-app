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
  
  render(){    
    return(
      <div className="kebab" onClick={this.kebabHandler}>
        <img src={image} className={`kebab__button ${this.state.show ? 'kebab__button--rotated' : ''}`} />
        {this.state.show ? <div className="kebab__hidden" onClick={this.testHandler}> Remove </div> : "" }
      </div>
    );
  }
}

export default Kebabmenu;