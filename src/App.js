import React, { Component } from 'react';
import './App.css';
import 'izitoast/dist/css/iziToast.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default App;
