import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.props.handleSubmit} >
          <h3>Create a toy!</h3>
          <input onChange={this.props.handleAddName} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.props.handleAddImage} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }
}

export default ToyForm;
