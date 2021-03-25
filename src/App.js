import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{
 
  state = {
    display: false,
    toys: [],
    toyName: ' ',
    toyImage: ' '
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toysData => this.setState({toys: toysData}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "name": this.state.toyName,
          "image": this.state.toyImage,
          "likes": 0 
        })
    })
    .then(res => res.json())
    .then(newToy => {
      let addToys = [...this.state.toys]
      addToys.push(newToy)
      this.setState({toys: addToys})
    })

  }

  handleAddName = (e) => {
    this.setState(
      {...this.state.toyName, toyName: e.target.value }
  )
}

handleAddImage = (e) => {
  this.setState(
    {...this.state.toyImage, toyImage: e.target.value }
  )
}

deleteToy = (id) => {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(oldToy => {
    let remainingToys = [...this.state.toys].filter(toy => toy.id !==  id)
    this.setState({toys: remainingToys})
  })
}

addLike = (toy) => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes+1
    })
  })
  .then(res => res.json())
  .then(toyLike => {
    let updateToys=this.state.toys.map(toy => {
      if (toy.id == toyLike.id) {
       toy.likes = toy.likes+1
       return toy
      }
      else {
        return toy
      }
    })
    this.setState({toys: updateToys})
  })
}

handleSearch = (e) => {
  if (e.charCode === 13) {
      let inputVal = e.target.value
      let newState = this.state.toys.filter(toy => toy.name.toLowerCase().includes(inputVal))
      this.setState({toys: newState})
  } 
}

  render() {
    return (
      <>
        <Header/>
        {this.state.display ? <ToyForm handleSubmit={this.handleSubmit} handleAddName={this.handleAddName} handleAddImage={this.handleAddImage}/> : null} 
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
          <br/>
          <input onKeyPress={this.handleSearch} type="text" name="search" placeholder="search"></input>
        </div>
        <ToyContainer postToys={this.state.toys} deleteToy={this.deleteToy} addLike={this.addLike} />
      </>
    );
  }
}

export default App;
