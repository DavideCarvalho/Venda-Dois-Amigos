import React, { Component } from 'react';
import ProductListContainer from './products-dashboard/product-list/ProductListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="shop-name">
          <h1 className="title">Venda Dois Amigos</h1>
        </div>
        <div className="container">
          <ProductListContainer />
        </div>
      </div>
    );
  }
}

export default App;
