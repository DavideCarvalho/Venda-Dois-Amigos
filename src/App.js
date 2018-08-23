import React, { Component } from 'react';
import ProductListContainer from './products-dashboard/product-list/ProductListContainer';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>{this.props.children}</main>
        {/* <Routes /> */}
      </div>
    );
  }
}

export default App;
