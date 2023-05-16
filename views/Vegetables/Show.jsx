import React, { Component } from 'react'

export class Show extends Component {
    
  render() {
    const veggie = this.props.veggie;
    
    return (
      <div>
        <h1>Veggy Show Page</h1>
        The {veggie.name} is {veggie.color} 
        {veggie.readyToEat? '. Its is ready to eat' : '. It is not ready to eat... Cant touch this' }
      </div>

    )
  }
}

export default Show