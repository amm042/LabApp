import React, { Component } from 'react'
import pacman from '../img/lg.eat-bean-pie-loading-gif.gif';

import './wait.css'

class Wait extends Component{
  render(){
    return (
      <div className="wait">
        <img
          src={pacman}
          alt="loading"/>
      </div>
    )
  }
}

export default Wait
