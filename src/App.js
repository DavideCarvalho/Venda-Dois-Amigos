import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default App;
