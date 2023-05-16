import React, { Component } from 'react'

export class veggiesIndex extends Component {
  
  render() {
    const veggies = this.props.vegetables;
    return (
      <div>
        <h1>Veggies Index Page</h1>
          <ul>
            {veggies.map((veggie, ind)=>{
              return(
                <li key={ind}>
                  The{" "} <a href={`/veggies/${veggie.id}`}>{veggie.name}</a>{' '}is{' '}{veggie.color}<br/>
                  {veggie.readyToEat ? 'It is ready to eat' : 'It is not ready to eat'}
                  <br />
                </li>
              )
            })}
          </ul>
          <nav>
            <a href="/veggies/new">Create a New Fruit</a>
          </nav>
      </div>
    )
  }
}

export default veggiesIndex

